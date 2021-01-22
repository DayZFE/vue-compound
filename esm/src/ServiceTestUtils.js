import { defineComponent, nextTick } from "vue";
import { default as VIH } from "vue-injection-helper";
const set = VIH.set;
/**
 * set up a test unit
 *
 * @export
 * @class TestUnit
 * @template T
 */
export class TestUnit {
    constructor(service) {
        this.props = [];
        this.valueKeyList = [];
        this.eventKeyList = [];
        this.eventPropsList = {};
        this.service = service;
    }
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
export function checkValue(wrapper, key, isObj) {
    return wrapper.get("#" + key + (isObj ? "-obj" : "")).text();
}
/**
 * trigger domain event on component
 *
 * @export
 * @param {VueWrapper<any>} wrapper
 * @param {(string | number)} key
 */
export async function triggerEvent(wrapper, key) {
    try {
        await wrapper.get("#" + key).trigger("click");
        await nextTick();
    }
    catch (err) {
        console.error("cannot trigger event of key:" + key);
    }
}
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
export function getCompo(testUnit, layer = 0, index = 0) {
    return defineComponent({
        setup() {
            let result;
            if (testUnit?.service) {
                result = testUnit.service(...testUnit.props);
            }
            else {
                throw new Error("please set a service function or class");
            }
            const values = testUnit.valueKeyList.map((el) => [
                el,
                result[el],
            ]);
            const events = testUnit.eventKeyList.map((el) => [
                el,
                result[el],
            ]);
            const strObj____ = (val) => JSON.stringify(val);
            const setServiceValue = (keyPath, value) => {
                set(result, keyPath, value);
            };
            return {
                layer,
                index,
                values,
                events,
                eventProps: testUnit.eventPropsList,
                setServiceValue,
                strObj____,
            };
        },
        template: `
    <div>
      <span v-for="item in values" :key="item[0]" :id="item[0]+(layer?'-'+layer:'')+(index?'-'+index:'')">{{item[1]?.value}}</span>
      <span v-for="item in values" :key="item[0]" :id="item[0]+'-obj'+(layer?'-'+layer:'')+(index?'-'+index:'')">{{strObj____(item[1]?.value)}}</span>
      <span v-for="item in events" :id="item[0]+(layer?'-'+layer:'')+(index?'-'+index:'')" @click="item[1](eventProps[item[0]])"></span>
      <span :id="'setValue'+(layer?'-'+layer:'')+(index?'-'+index:'')" @click="setServiceValue(eventProps[item[0]])"></span>
      <slot></slot>
    </div>
    `,
    });
}
/**
 * get component of nested units
 *
 * @export
 * @param {...TestUnit<any>[]} testUnits
 * @returns
 */
export function getCompoNested(...testUnits) {
    return defineComponent({
        name: "mapping-compo",
        props: ["index"],
        template: `
      <component v-if="compo" :is="compo">
             <mapping-compo  :index="index?(index+1):1"></mapping-compo>
      </component>
    `,
        computed: {
            compo() {
                const unit = testUnits[this.index];
                return unit
                    ? getCompo(unit, this.index)
                    : this.index
                        ? null
                        : getCompo(testUnits[0]);
            },
        },
    });
}
/**
 * get test units mapping component
 *
 * @export
 * @param {UnitMapping} testUnits
 * @returns
 */
export function getCompoMapping(testUnits) {
    return defineComponent({
        name: "mapping-compo",
        props: ["units", "layer", "idx"],
        template: `
      <component :is="compo">
             <mapping-compo 
             v-for="item,index in children" 
             :units = "item"
             :layer="layer?(layer+1):1"
             :idx="index"
             ></mapping-compo>
      </component>
    `,
        computed: {
            compo() {
                const self = this;
                const unit = self.units ? self.units.unit : testUnits.unit;
                return getCompo(unit, self.layer ? self.layer : 0, self.idx ? self.idx : 0);
            },
            children() {
                const self = this;
                if (self.units) {
                    if (self.units.children) {
                        return self.units.children;
                    }
                    return [];
                }
                return testUnits.children;
            },
        },
    });
}
/**
 * wait for mini seconds
 *
 * @export
 * @param {number} n
 * @returns
 */
export function wait(n) {
    return new Promise((res) => {
        setTimeout(res, n);
    });
}
//# sourceMappingURL=ServiceTestUtils.js.map