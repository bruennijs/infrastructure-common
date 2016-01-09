import { IdObject } from "./entity";
export interface IFactory<TModel extends IdObject> {
    CreateFromMongoDocument(document: any): TModel;
    ToMongoDocument(obj: TModel): any;
}
