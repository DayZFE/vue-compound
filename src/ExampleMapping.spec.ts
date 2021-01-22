import { mount } from "@vue/test-utils";
import {
  checkValue,
  getCompoMapping,
  TestUnit,
  triggerEvent,
} from "./ServiceTestUtils";
import { RootService, LeafService } from "./ExampleNestedService";

const rootUnit = new TestUnit(RootService);
rootUnit.valueKeyList = ["test", "test2"];
rootUnit.eventKeyList = ["changeTest"];
rootUnit.eventPropsList = { changeTest: null };

const leafUnit = new TestUnit(LeafService);
leafUnit.valueKeyList = ["test"];
leafUnit.eventKeyList = ["changeTest"];
leafUnit.eventPropsList = { changeTest: null };

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
});
