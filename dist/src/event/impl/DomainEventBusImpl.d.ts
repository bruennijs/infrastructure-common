import * as rx from "rx";
import { IDomainEventBus, IDomainEvent } from "../../event";
export declare class DomainEventBusImpl implements IDomainEventBus {
    private map;
    constructor();
    publish(event: IDomainEvent): void;
    subscribe(contextName: string): rx.Observable<IDomainEvent>;
}
