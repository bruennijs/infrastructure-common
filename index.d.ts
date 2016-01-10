/// <reference path="index.ref.d.ts" />
declare module 'infrastructure-common/entity' {
	/// <reference path="../../typings/auto.d.ts" />
	export class Id {
	    value: string;
	    private _value;
	    constructor(value: string);
	    static parse(value: string): Id;
	    toString(): string;
	}
	export class IdObject {
	    version: number;
	    id: Id;
	    private _id;
	    constructor(id: Id, version?: number);
	    private _version;
	    static Parse(json: string): IdObject;
	    load(obj: any): void;
	    loadFrom(json: string): void;
	    toString(): string;
	}

}
declare module 'infrastructure-common/event' {
	/// <reference path="../../typings/auto.d.ts" />
	import rx = require('rx');
	import { Id } from 'infrastructure-common/entity';
	export interface IDomainEvent {
	    context: string;
	    name: string;
	}
	export class DomainEventBase implements IDomainEvent {
	    name: string;
	    private _name;
	    context: string;
	    private _context;
	    constructor(context: string, name: string);
	}
	export class AggregateEvent extends DomainEventBase {
	    id: Id;
	    private _id;
	    version: string;
	    private _version;
	    constructor(context: string, name: string, id: Id, version: string);
	}
	export interface IDomainEventBus {
	    publish(event: IDomainEvent): void;
	    subscribe(group: string): rx.Observable<IDomainEvent>;
	}
	export interface IEventHandler<TEvent extends IDomainEvent> {
	    Handle(event: TEvent): TEvent[];
	}

}
declare module 'infrastructure-common/impl/event' {
	/// <reference path="../../../typings/auto.d.ts" />
	import * as rx from "rx";
	import { IDomainEvent, IDomainEventBus } from 'infrastructure-common/event';
	export class DomainEventBusImpl implements IDomainEventBus {
	    private map;
	    constructor();
	    publish(event: IDomainEvent): void;
	    subscribe(contextName: string): rx.Observable<IDomainEvent>;
	}

}
declare module 'infrastructure-common/factory' {
	/// <reference path="../../typings/auto.d.ts" />
	import { IdObject } from 'infrastructure-common/entity';
	export interface IFactory<TModel extends IdObject> {
	    CreateFromMongoDocument(document: any): TModel;
	    ToMongoDocument(obj: TModel): any;
	}

}
declare module 'infrastructure-common/persistence' {
	/// <reference path="../../typings/auto.d.ts" />
	import rx = require('rx');
	import { IdObject, Id } from 'infrastructure-common/entity';
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

}
declare module 'infrastructure-common/impl/persistence' {
	/// <reference path="../../../typings/auto.d.ts" />
	import rx = require('rx');
	import mongodb = require("mongodb");
	import { IFactory } from 'infrastructure-common/factory';
	import { IdObject, Id } from 'infrastructure-common/entity';
	import { IRepository, Func2 } from 'infrastructure-common/persistence';
	export class MongoDbRepository<TModel extends IdObject> implements IRepository<IdObject> {
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

}
declare module 'infrastructure-common/parser/event' {
	/// <reference path="../../../typings/auto.d.ts" />
	import { IDomainEvent } from 'infrastructure-common/event';
	export class DomainEventDtoParser {
	    serialize(dtoObject: any, event: IDomainEvent): void;
	    addContent(objectAddTo: any, content: any): void;
	}

}
declare module 'infrastructure-common' {
	export * from 'infrastructure-common/impl/event';
	export * from 'infrastructure-common/impl/persistence';
	export * from 'infrastructure-common/parser/event';

}
