import { mount } from "@vue/test-utils";
import {
  checkValue,
  getMockCompo,
  TestUnit,
  triggerEvent,
} from "./ServiceTestUtils";
import ExampleService from "./ExampleService";

const unit = new TestUnit(ExampleService);
unit.valueKeyList = ["test"];
unit.eventKeyList = ["changeTest"];
unit.eventPropsList = { changeTest: null };

describe("ExampleService", () => {
  let mockCompo = getMockCompo(unit);
  let wrapper = mount(mockCompo);
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
    unit.eventPropsList.changeTest = "another test";
    await triggerEvent(wrapper, "changeTest");
    expect(checkValue(wrapper, "test")).toBe("another test");
  });
});
