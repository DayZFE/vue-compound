import { mount } from "@vue/test-utils";
import Root from "./Root.mock";

describe("Component", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(Root);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.get("#test").text()).toBe("check");
  });
});
