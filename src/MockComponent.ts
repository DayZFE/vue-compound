import { defineComponent } from "vue";

type ServiceFunc<T> = (...args: any[]) => T;
interface TestUnit<T> {
  props: any[];
  service: ServiceFunc<T>;
  valueKeyList: (string | number)[];
  eventKeyList: (string | number)[];
  eventPropsList: any;
}

export default function getMockComponent<T>(testUnit: TestUnit<T>) {
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
      <span v-for="item in values" :key="item[0]" :id="item[0]">{{item[1]}}</span>
      <span v-for="item in values" :key="item[0]" :id="item[0]+'-obj'">{{strObj____(item[1])}}</span>
      <span v-for="item in events" :id="item[0]" @click="item[1](eventProps[item[0]])"></span>
    </div>
    `,
  });
}
