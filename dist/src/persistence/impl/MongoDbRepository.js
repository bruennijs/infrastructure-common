var rx = require('rx');
var mongodb = require("mongodb");
var model_1 = require("../../model");
var MongoDbRepository = (function () {
    function MongoDbRepository(configuration, factory, collectionName) {
        this._db = null;
        this._collection = null;
        this.configuration = configuration;
        this.factory = factory;
        this._collectionName = collectionName;
    }
    Object.defineProperty(MongoDbRepository.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MongoDbRepository.prototype, "db", {
        get: function () {
            return this._db;
        },
        enumerable: true,
        configurable: true
    });
    MongoDbRepository.prototype.Init = function (dropCollections) {
        var that = this;
        var subject = new rx.ReplaySubject();
        mongodb.MongoClient.connect(that.configuration.mongodb_url, function (err, db) {
            if (err != null) {
                console.log("Mongo connection failed[" + that.configuration.mongodb_url + "]");
                subject.onError(err);
                return;
            }
            console.log("Mongodb connection established [" + that.configuration.mongodb_url + "]");
            that._db = db;
            var col = that._db.collection(that._collectionName);
            if (!col) {
                that.CreateCollection(function (err, col) {
                    if (!err) {
                        subject.onCompleted();
                    }
                    else {
                        subject.onError(err);
                    }
                });
            }
            else {
                if (dropCollections) {
                    that._db.dropCollection(that._collectionName, function (err, col) {
                        that.CreateCollection(function (err, col) {
                            if (!err) {
                                subject.onCompleted();
                            }
                            else {
                                subject.onError(err);
                            }
                        });
                    });
                }
                else {
                    that._collection = col;
                    subject.onCompleted();
                }
            }
        });
        return subject;
    };
    MongoDbRepository.prototype.Find = function (cb) {
        if (!this._collection) {
            throw new Error('Not initialized');
        }
        var that = this;
        this._collection.find({}).toArray(function (err, objs) {
            var models = [];
            objs.forEach(function (item, n, ar) {
                models.push(that.factory.CreateFromMongoDocument(item));
            });
            cb(err, models);
        });
    };
    MongoDbRepository.prototype.Insert = function (object) {
        var insertOne = rx.Observable.fromNodeCallback(this._collection.insertOne, this._collection);
        return insertOne(this.factory.ToMongoDocument(object)).select(function (mongoResult) {
            return object;
        });
    };
    MongoDbRepository.prototype.Update = function (object) {
        var updateOne = rx.Observable.fromNodeCallback(this._collection.updateOne, this._collection);
        return updateOne({ _id: new mongodb.ObjectID(object.toString()) }, this.factory.ToMongoDocument(object)).select(function (mongoResult) {
            return object;
        });
    };
    MongoDbRepository.prototype.CreateCollection = function (cb) {
        var that = this;
        this._db.createCollection(this._collectionName, function (err, col) {
            if (!err) {
                that._collection = col;
            }
            cb(err, col);
        });
    };
    MongoDbRepository.prototype.nextId = function () {
        return model_1.Id.parse(new mongodb.ObjectID().toHexString());
    };
    MongoDbRepository.prototype.GetById = function (id) {
        var subject = new rx.ReplaySubject();
        var that = this;
        this.collection
            .find({ _id: new mongodb.ObjectID(id.value) })
            .toArray(function (err, objs) {
            if (!err) {
                subject.onNext(that.factory.CreateFromMongoDocument(objs[0]));
                subject.onCompleted();
            }
            else {
                subject.onError(err);
            }
        });
        return subject;
    };
    return MongoDbRepository;
})();
exports.MongoDbRepository = MongoDbRepository;
//# sourceMappingURL=MongoDbRepository.js.map