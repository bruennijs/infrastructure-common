/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="../../typings/auto.d.ts" />

import util = require('util');
import fs = require('fs');
import path = require('path');
import _ = require('underscore');

    /**
     * Entity id object
     */
    export class Id {
        public get value():string {
            return this._value;
        }

        private _value:string;

        constructor(value:string) {
            this._value = value;
        }

        public static parse(value:string):Id {
            return new Id(value);
        }

        public toString():string {
            return this._value;
        }
    }

    /**
     * Created by bruenni on 16.08.15.
     */
    export class IdObject {
        public get version():number {
            return this._version;
        }

        public set version(value:number) {
            this._version = value;
        }

        public get id() {
            return this._id;
        }

        private _id:Id;

        constructor(id:Id, version?:number) {
            this._id = id;
            this._version = version;
        }

        private _version:number = 0;

        /**
         * Parses json content to IdObject
         * @param json
         * @returns {*}
         * @constructor
         */
        static Parse(json:string):IdObject {
            var obj = JSON.parse(json);
            ///util.inherits(model, Models.IdObject); //// no, only copies prototype's function into a constructor's prototype
            //return _.create(IdObject.prototype, obj);
            return null;
        }

        /**
         * loads properties from json to this instance.
         */
        load(obj:any):void {
            _.extend(this, obj);
        }

        /*
         * loads from string.
         */
        loadFrom(json:string) {
            this.load(JSON.parse(json));
        }

        toString():string {
            return this._id.toString();
        }
    }