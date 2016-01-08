export declare class Id {
    value: string;
    private _value;
    constructor(value: string);
    static parse(value: string): Id;
    toString(): string;
}
export declare class IdObject {
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
