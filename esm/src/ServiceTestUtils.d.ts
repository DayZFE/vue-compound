import { VueWrapper } from "@vue/test-utils";
export declare type ServiceFunc<T> = (...args: any[]) => T;
/**
 * set up a test unit
 *
 * @export
 * @class TestUnit
 * @template T
 */
export declare class TestUnit<T> {
    service: ServiceFunc<T>;
    props: any[];
    valueKeyList: (string | number)[];
    eventKeyList: (string | number)[];
    eventPropsList: any;
    constructor(service: ServiceFunc<T>);
}
/**
 * check the ref value
 *
 * @export
 * @param {VueWrapper<any>} wrapper
 * @param {(string | number)} key
 * @param {boolean} [isObj]
 * @returns
 */
export declare function checkValue(wrapper: VueWrapper<any>, key: string | number, isObj?: boolean): string;
/**
 * trigger domain event on component
 *
 * @export
 * @param {VueWrapper<any>} wrapper
 * @param {(string | number)} key
 */
export declare function triggerEvent(wrapper: VueWrapper<any>, key: string | number): Promise<void>;
/**
 * get component of certain test unit
 *
 * @export
 * @template T
 * @param {TestUnit<T>} testUnit
 * @param {number} [layer=0]
 * @param {number} [index=0]
 * @returns
 */
export declare function getCompo<T>(testUnit: TestUnit<T>, layer?: number, index?: number): import("vue").DefineComponent<{}, {
    layer: number;
    index: number;
    values: any[][];
    events: any[][];
    eventProps: any;
    setServiceValue: (keyPath: string[], value: any) => void;
    strObj____: (val: any) => string;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {}>, {}>;
/**
 * get component of nested units
 *
 * @export
 * @param {...TestUnit<any>[]} testUnits
 * @returns
 */
export declare function getCompoNested(...testUnits: TestUnit<any>[]): import("vue").DefineComponent<Readonly<{
    index?: any;
}>, unknown, unknown, {
    compo(): import("vue").DefineComponent<{}, {
        layer: number;
        index: number;
        values: any[][];
        events: any[][];
        eventProps: any;
        setServiceValue: (keyPath: string[], value: any) => void;
        strObj____: (val: any) => string;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {}>, {}> | null;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    index: any;
} & {}>, {
    index: any;
}>;
/**
 * mapping of test units
 *
 * @export
 * @interface UnitMapping
 */
export interface UnitMapping {
    unit: TestUnit<any>;
    children?: UnitMapping[];
}
/**
 * get test units mapping component
 *
 * @export
 * @param {UnitMapping} testUnits
 * @returns
 */
export declare function getCompoMapping(testUnits: UnitMapping): import("vue").DefineComponent<Readonly<{
    units?: any;
    layer?: any;
    idx?: any;
}>, unknown, unknown, {
    compo(): import("vue").DefineComponent<{}, {
        layer: number;
        index: number;
        values: any[][];
        events: any[][];
        eventProps: any;
        setServiceValue: (keyPath: string[], value: any) => void;
        strObj____: (val: any) => string;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {}>, {}>;
    children(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    units: any;
    layer: any;
    idx: any;
} & {}>, {
    units: any;
    layer: any;
    idx: any;
}>;
/**
 * wait for mini seconds
 *
 * @export
 * @param {number} n
 * @returns
 */
export declare function wait(n: number): Promise<unknown>;
