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
declare module 'infrastructure-common/parser/event' {
	/// <reference path="../../../typings/auto.d.ts" />
	import { IDomainEvent } from 'infrastructure-common/event';
	export class DomainEventDtoParser {
	    serialize(dtoObject: any, event: IDomainEvent): void;
	    addContent(objectAddTo: any, content: any): void;
	}

}
declare module 'infrastructure-common' {
	export * from 'infrastructure-common/event';
	export * from 'infrastructure-common/entity';
	export * from 'infrastructure-common/impl/event';
	export * from 'infrastructure-common/impl/persistence';
	export * from 'infrastructure-common/parser/event';

}
