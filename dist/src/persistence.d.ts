/// <reference path="../../typings/tsd.d.ts" />
import rx = require('rx');
import { IdObject, Id } from "./model";
export interface Func1<T1, TResult> {
    (arg1?: T1): TResult;
}
export interface Func2<T1, T2, TResult> {
    (arg1?: T1, arg2?: T2): TResult;
}
export interface IRepository<TModel extends IdObject> {
    GetById(id: Id): rx.Observable<TModel>;
    Find(cb: Func2<Error, TModel[], void>): void;
    Insert(object: TModel): rx.Observable<TModel>;
    Update(object: TModel): rx.Observable<TModel>;
    nextId(): Id;
}
