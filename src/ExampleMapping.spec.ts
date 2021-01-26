import { mount } from "@vue/test-utils";
import {
  checkValue,
  getCompoMapping,
  getUnit,
  triggerEvent,
  wait,
} from "./ServiceTestUtils";
import { RootFormula, LeafFormula } from "./ExampleNestedFormula";

const rootUnit = getUnit(RootFormula, [], { changeTest: null });
const leafUnit = getUnit(LeafFormula, [], { changeTest: null });

describe("ExampleService", () => {
  const compoMap = getCompoMapping({
    unit: rootUnit,
    children: [
      {
        unit: leafUnit,
      },
      { unit: leafUnit },
    ],
  });
  let wrapper = mount(compoMap);
  test("is a Vue instance", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  test("second leaf will have a test ref value 'test'", () => {
    expect(checkValue(wrapper, "test-1-1")).toBe("test");
  });
  test("trigger leaf will set test value to 'new test'", async () => {
    await triggerEvent(wrapper, "changeTest");
    expect(checkValue(wrapper, "test-1-1")).toBe("new test");
  });
  test("leaf bondLength will be 0", async () => {
    await wait(2);
    expect(checkValue(wrapper, "bondLength-1-1")).toBe("0");
  });
});
