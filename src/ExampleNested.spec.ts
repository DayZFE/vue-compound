import { mount } from "@vue/test-utils";
import {
  checkValue,
  getCompoNested,
  getUnit,
  triggerEvent,
  wait,
} from "./ServiceTestUtils";
import { RootFormula, LeafFormula } from "./ExampleNestedFormula";

const rootUnit = getUnit(RootFormula, [], {});
const leafUnit = getUnit(LeafFormula, [], { changeTest: null });

describe("ExampleFormula", () => {
  const compoMap = getCompoNested(rootUnit, leafUnit);
  let wrapper = mount(compoMap);
  test("is a Vue instance", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  test("leaf will have a test ref value 'test'", () => {
    expect(checkValue(wrapper, "test-1")).toBe("test");
  });
  test("trigger leaf will set test value to 'new test'", async () => {
    await triggerEvent(wrapper, "changeTest");
    expect(checkValue(wrapper, "test-1")).toBe("new test");
  });
  test("linked 2 bond", async () => {
    await wait(2);
    expect(checkValue(wrapper, "bondLength")).toBe("2");
  });
});
