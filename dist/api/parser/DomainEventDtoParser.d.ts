import { IDomainEvent } from "./../event";
export declare class DomainEventDtoParser {
    serialize(dtoObject: any, event: IDomainEvent): void;
    addContent(objectAddTo: any, content: any): void;
}
