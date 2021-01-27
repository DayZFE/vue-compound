import { VueWrapper } from "@vue/test-utils";
import {
  computed,
  defineComponent,
  isRef,
  nextTick,
  ref,
  watch,
  watchEffect,
} from "vue";
import { bondSet, watchPoly, QueryPath, cataly, bondGet } from "vue-poly";
// service function
export type ServiceFunc<T> = (...args: any[]) => T;

/**
 * check the ref value
 *
 * @export
 * @param {VueWrapper<any>} wrapper
 * @param {(string | number)} key
 * @param {boolean} [isObj]
 * @returns
 */
export function checkValue(
  wrapper: VueWrapper<any>,
  key: string | number,
  isObj?: boolean
) {
  return wrapper.get("#" + key + (isObj ? "-obj" : "")).text();
}

/**
 * trigger domain event on component
 *
 * @export
 * @param {VueWrapper<any>} wrapper
 * @param {(string | number)} key
 */
export async function triggerEvent(
  wrapper: VueWrapper<any>,
  key: string | number
) {
  try {
    await wrapper.get("#" + key).trigger("click");
    await nextTick();
  } catch (err) {
    console.error("cannot trigger event of key:" + key);
  }
}

export function getUnit(
  formula: any,
  formulaProps: any[],
  eventProps: { [key: string]: any }
) {
  return { formula, formulaProps, eventProps };
}
const mockUnit = cataly(getUnit);

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
export function getCompo<T>(
  unit: typeof mockUnit,
  layer: number = 0,
  index: number = 0
) {
  return defineComponent({
    setup() {
      const poly = unit.formula(...(unit.formulaProps || []));
      const eventProps = unit.eventProps || {};
      const values: any[] = [];
      const events: any[] = [];
      for (let key of Object.keys(poly)) {
        if (typeof poly[key] === "function") {
          events.push([key, poly[key]]);
        } else {
          values.push([key, poly[key]]);
        }
      }
      const bondLength = ref(0);
      const frozen = ref(false);
      if (poly.id) {
        watchPoly(poly, (res) => {
          bondLength.value = res.bondList.length;
          frozen.value = res.frozen;
        });
      }
      const setPolyValue = (prop: { queryPath: QueryPath; value: any }) => {
        bondSet(poly, prop.queryPath, prop.value);
      };
      const getValue__ = (val: any) => (isRef(val) ? val.value : val);
      const getStrValue__ = (val: any) => JSON.stringify(getValue__(val));
      return {
        layer,
        index,
        values,
        events,
        eventProps,
        bondLength,
        frozen,
        setPolyValue,
        getValue__,
        getStrValue__,
      };
    },
    template: `
    <div>
      <span v-for="item in values" :key="item[0]" :id="item[0]+(layer?'-'+layer:'')+(index?'-'+index:'')">{{getValue__(item[1])}}</span>
      <span v-for="item in values" :key="item[0]" :id="item[0]+'-obj'+(layer?'-'+layer:'')+(index?'-'+index:'')">{{getStrValue__(item[1])}}</span>
      <span v-for="item in events" :id="item[0]+(layer?'-'+layer:'')+(index?'-'+index:'')" @click="item[1](eventProps[item[0]])"></span>
      <span :id="'setValue'+(layer?'-'+layer:'')+(index?'-'+index:'')" @click="setPolyValue(eventProps['setPolyValue'])"></span>
      <span  :id="'bondLength'+(layer?'-'+layer:'')+(index?'-'+index:'')">{{bondLength}}</span>
      <span  :id="'frozen'+(layer?'-'+layer:'')+(index?'-'+index:'')">{{frozen}}</span>
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
export function getCompoNested(...units: typeof mockUnit[]) {
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
        const unit = units[(this as any).index];
        return unit
          ? getCompo(unit, (this as any).index)
          : (this as any).index
          ? null
          : getCompo(units[0]);
      },
    },
  });
}

/**
 * mapping of test units
 *
 * @export
 * @interface UnitMapping
 */
export interface UnitMapping {
  unit: typeof mockUnit;
  children?: UnitMapping[];
}

/**
 * get test units mapping component
 *
 * @export
 * @param {UnitMapping} testUnits
 * @returns
 */
export function getCompoMapping(testUnits: UnitMapping) {
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
        const self: any = this;
        const unit = self.units ? self.units.unit : testUnits.unit;
        return getCompo(
          unit,
          self.layer ? self.layer : 0,
          self.idx ? self.idx : 0
        );
      },
      children() {
        const self: any = this;
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
export function wait(n: number) {
  return new Promise((res) => {
    setTimeout(res, n);
  });
}
