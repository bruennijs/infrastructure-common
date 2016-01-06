/**
 * Created by bruenni on 19.12.15.
 */

var _ = require("underscore");
import {IDomainEvent} from "./../../event";

/**
 * Creates message dtos from domain models
 */
export class DomainEventDtoParser {

  /**
   * Creates DTO from domain object.
   * @param msg
   * @returns {MessageDto}
   */
  serialize(dtoObject: any, event: IDomainEvent): void {
    dtoObject.context = event.context;
    dtoObject.name = event.name;
    dtoObject.content = {};
  }

  /**
   * Adds object to event content property.
   * @param content
   */
  addContent(objectAddTo: any, content: any): void {
    if (objectAddTo.content === undefined)
    {
      objectAddTo.content = {};
    }
    _.extend(objectAddTo.content, content);
  }
};
