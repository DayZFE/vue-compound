import { mount } from "@vue/test-utils";
import getMockComponent from "../MockComponent";
import TreeService from "./TreeService";

const MockComponent = getMockComponent({
  props: [],
  service: TreeService,
  valueKeyList: ["test"],
  eventKeyList: [],
  eventPropsList: {},
});
console.log(JSON.stringify(MockComponent));

describe("Component", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(MockComponent);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.get("#test").text()).toBe("test");
  });
});
