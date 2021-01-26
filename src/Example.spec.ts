import { mount } from "@vue/test-utils";
import {
  checkValue,
  getCompo,
  getUnit,
  triggerEvent,
} from "./ServiceTestUtils";
import ExampleFormula from "./ExampleFormula";

const unit = getUnit(ExampleFormula, [], {});
let mockCompo = getCompo(unit);
let wrapper = mount(mockCompo);

describe("ExampleFormula", () => {
  test("is a Vue instance", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  test("has a ref named test value 'test'", () => {
    expect(checkValue(wrapper, "test")).toBe("test");
  });
  test("has a event changeTest, change ref to 'new test'", async () => {
    await triggerEvent(wrapper, "changeTest");
    expect(checkValue(wrapper, "test")).toBe("new test");
  });
  test("changeTest will change test ref with certain prop", async () => {
    unit.eventProps.changeTest = "another test";
    await triggerEvent(wrapper, "changeTest");
    expect(checkValue(wrapper, "test")).toBe("another test");
  });
});
