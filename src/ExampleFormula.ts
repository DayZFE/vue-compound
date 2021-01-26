import { ref } from "vue";
import { definePoly } from "vue-poly";

export default function ExampleFormula() {
  const test = ref("test");
  const changeTest = (val: string) => {
    if (val) {
      test.value = val;
    } else {
      test.value = "new test";
    }
  };
  const poly = definePoly({ id: "base", test, changeTest });
  return poly;
}
