import { ref } from "vue";

export default function ExampleService() {
  const test = ref("test");
  const changeTest = (val: string) => {
    if (val) {
      test.value = val;
    } else {
      test.value = "new test";
    }
  };
  return { test, changeTest };
}
