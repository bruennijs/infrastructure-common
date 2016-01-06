/**
 * Created by bruenni on 24.09.15.
 */

/// <reference path="./../../../typings/tsd.d.ts" />

import rx = require('rx');
import mongodb = require("mongodb");

import {IFactory} from "../../factory";
import {IdObject, Id} from "../../model";
import {IRepository, Func1, Func2} from "../../persistence";

export class MongoDbRepository<TModel extends IdObject> implements IRepository<IdObject> {

  /**
   * INheriting classes can use collection to access db.
   * @return {mongodb.Collection}
   */
  protected get collection():mongodb.Collection {
    return this._collection;
  }

  protected get db():mongodb.Db {
    return this._db;
  }

  public  configuration:any;
  public factory: IFactory<TModel>;

  private _db: mongodb.Db = null;
  private _collection: mongodb.Collection = null;
  private _collectionName:string;

  constructor(configuration: any, factory: IFactory<TModel>, collectionName: string) {
    this.configuration = configuration;
    this.factory = factory;
    this._collectionName = collectionName;
  }

  public Init(dropCollections?: boolean): rx.Observable<void> {

    var that = this;

    var subject = new rx.ReplaySubject<void>();

    //console.log("Mongo connecting [" + that.configuration.mongodb_url + "]");

    mongodb.MongoClient.connect(that.configuration.mongodb_url, function(err, db) {

      if (err != null) {
        console.log("Mongo connection failed[" + that.configuration.mongodb_url + "]");
        subject.onError(err)
        return;
      }

      console.log("Mongodb connection established [" + that.configuration.mongodb_url + "]");
      that._db = db;

      // get collection users
      var col = that._db.collection(that._collectionName);
      if (!col)
      {
        // create new collection
        that.CreateCollection(function(err, col) {
          if (!err)
          {
            subject.onCompleted();
          }
          else
          {
            subject.onError(err);
          }
        });
      }
      else
      {
        // collection already exist

        if (dropCollections)
        {
          /// drop collection
          that._db.dropCollection(that._collectionName, function(err, col) {
            // create new collection
            that.CreateCollection(function(err, col) {
              if (!err)
              {
                subject.onCompleted();
              }
              else
              {
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
  }

  /**
   * Finds entities by predicate.
   * @param cb
   * @constructor
   */
  public Find(cb: Func2<Error, TModel[], void>):void {
    if (!this._collection)
    {
      throw new Error('Not initialized');
    }

    var that = this;

    //// fidn all items
    this._collection.find({}).toArray(function(err, objs) {

      var models = [];

      //model.Note.Parse
      objs.forEach(function(item, n, ar) {
        //console.log(item);
        models.push(that.factory.CreateFromMongoDocument(item));
      });

      cb(err, models);
    });
  }

  /**
   * Inserts mdoels to database
   * @param object
   * @returns {Observable<TModel>}
   * @constructor
   */
  public Insert(object: TModel): rx.Observable<TModel> {
    var insertOne = rx.Observable.fromNodeCallback(this._collection.insertOne, this._collection);

    return insertOne(this.factory.ToMongoDocument(object)).select(function(mongoResult: any)
    {
      return object;
    });
  }

  /**
   * Updates document in db by primary id.
   * @param object
   * @returns {any}
   * @constructor
   */
  public Update(object: TModel): rx.Observable<TModel> {
    //console.log(JSON.stringify(object));
    var updateOne = rx.Observable.fromNodeCallback(this._collection.updateOne, this._collection);

    return updateOne({_id: new mongodb.ObjectID(object.toString())}, this.factory.ToMongoDocument(object)).select(function(mongoResult: any)
    {
      return object;
    });
  }

  private CreateCollection(cb: (err: Error, col: mongodb.Collection) => void) {
    var that = this;
    this._db.createCollection(this._collectionName, function(err, col) {
      if (!err)
      {
        that._collection = col;
      }

      cb(err, col);
    });
  }

  nextId():Id {
    return Id.parse(new mongodb.ObjectID().toHexString());
  }

  /**
   * Gets document where _id === parameter.id
   * @param id
   * @returns {ReplaySubject<T>}
   * @constructor
   */
  GetById(id: Id): Rx.Observable<TModel> {
    var subject = new rx.ReplaySubject<TModel>();
    var that = this;

    this.collection
        .find({_id: new mongodb.ObjectID(id.value)})
        .toArray(function(err, objs)
        {
          if(!err) {
            subject.onNext(that.factory.CreateFromMongoDocument(objs[0]));
            subject.onCompleted();
          }
          else {
            subject.onError(err);
          }
        });

    return subject;
  }
}