import { IdObject } from "./model";
export interface IFactory<TModel extends IdObject> {
    CreateFromMongoDocument(document: any): TModel;
    ToMongoDocument(obj: TModel): any;
}
