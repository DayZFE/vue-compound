import { ref } from "vue";
import { bond, definePoly } from "vue-poly";

export function RootFormula() {
  const test = ref("test");
  const poly = definePoly({
    id: "test-token",
    test,
    test2: ref("test2"),
    changeTest: () => {
      test.value = "new test";
    },
  });
  return poly;
}

export function LeafFormula() {
  const poly = definePoly({
    id: "leaf",
    test: bond("test-token", ["test", "value"], "default test"),
    changeTest: bond("test-token", "changeTest", () => {}),
  });
  return poly;
}
