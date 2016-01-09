import rx = require('rx');
import mongodb = require("mongodb");
import { IFactory } from "../factory";
import { IdObject, Id } from "../entity";
import { IRepository, Func2 } from "../persistence";
export declare class MongoDbRepository<TModel extends IdObject> implements IRepository<IdObject> {
    protected collection: mongodb.Collection;
    protected db: mongodb.Db;
    configuration: any;
    factory: IFactory<TModel>;
    private _db;
    private _collection;
    private _collectionName;
    constructor(configuration: any, factory: IFactory<TModel>, collectionName: string);
    Init(dropCollections?: boolean): rx.Observable<void>;
    Find(cb: Func2<Error, TModel[], void>): void;
    Insert(object: TModel): rx.Observable<TModel>;
    Update(object: TModel): rx.Observable<TModel>;
    private CreateCollection(cb);
    nextId(): Id;
    GetById(id: Id): Rx.Observable<TModel>;
}
