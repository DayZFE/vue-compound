import { VueWrapper } from "@vue/test-utils";
import { DefineComponent, defineComponent, nextTick } from "vue";

export type ServiceFunc<T> = (...args: any[]) => T;
export class TestUnit<T> {
  service: ServiceFunc<T>;
  props: any[] = [];
  valueKeyList: (string | number)[] = [];
  eventKeyList: (string | number)[] = [];
  eventPropsList: any = {};
  constructor(service: ServiceFunc<T>) {
    this.service = service;
  }
}

export function checkValue(
  wrapper: VueWrapper<any>,
  key: string | number,
  isObj?: boolean
) {
  return wrapper.get("#" + key + (isObj ? "-obj" : "")).text();
}

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

export function getMockCompo<T>(testUnit: TestUnit<T>) {
  return defineComponent({
    setup() {
      const result = testUnit.service(...testUnit.props);
      const values = testUnit.valueKeyList.map((el) => [
        el,
        (result as any)[el],
      ]);
      const events = testUnit.eventKeyList.map((el) => [
        el,
        (result as any)[el],
      ]);
      const strObj____ = (val: any) => JSON.stringify(val);
      return {
        values,
        events,
        eventProps: testUnit.eventPropsList,
        strObj____,
      };
    },
    template: `
    <div>
      <span v-for="item in values" :key="item[0]" :id="item[0]">{{item[1]?.value}}</span>
      <span v-for="item in values" :key="item[0]" :id="item[0]+'-obj'">{{strObj____(item[1]?.value)}}</span>
      <span v-for="item in events" :id="item[0]" @click="item[1](eventProps[item[0]])"></span>
    </div>
    `,
  });
}

// export interface MockCompoMap {
//   Compo: DefineComponent;
//   children: MockCompoMap[];
// }
// export function mappingCompo(compoMap: MockCompoMap) {
//   let layer = 0
//   const Mapping = defineComponent({
//     props: {layer:Number},
//     component: [
//       ["test-compo-layer-"+layer+"-" + Math.trunc(Math.random() * 100) + "-" + Date.now()]:this.Compo,
//     ],
//     template: `

//     `,
//   });
// }
