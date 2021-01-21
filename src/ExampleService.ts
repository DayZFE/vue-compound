import { ref } from "vue";

export default function ExampleService() {
  const test = ref("test");
  const changeTest = () => {
    test.value = "new test";
  };
  return { test, changeTest };
}
