import { mount } from "@vue/test-utils";
import { checkValue, getMockCompo, triggerEvent } from "./ServiceTestUtils";
import ExampleService from "./ExampleService";

const MockCompo = getMockCompo({
  props: [],
  service: ExampleService,
  valueKeyList: ["test"],
  eventKeyList: ["changeTest"],
  eventPropsList: { changeTest: null },
});

describe("Component", () => {
  test("is a Vue instance", async () => {
    const wrapper = mount(MockCompo);
    expect(wrapper.exists()).toBeTruthy();
    expect(checkValue(wrapper, "test")).toBe("test");
    await triggerEvent(wrapper, "changeTest");
    expect(checkValue(wrapper, "test")).toBe("new test");
  });
});
