import { mount } from "@vue/test-utils";
import { shallowRef } from "vue";
import { checkValue, getCompo, TestUnit, triggerEvent } from "../../ServiceTestUtils";
import { Selection } from "./Selection";

const dataSource = shallowRef([{key: 1, value: 'hello'}]);

const Service = function () {
  return Selection({
    dataSource,
    trackBy: (item) => item.key,
    multiple: false
  });
};

const MultipleService = function() {
  return Selection({
    dataSource,
    trackBy: (item) => item.key,
    multiple: true
  });
}

const unit = new TestUnit(Service);

describe("Collection", () => {
  let mockCompo = getCompo(unit);
  let wrapper = mount(mockCompo);
  test("is a Vue instance", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  test("set touched false when constructed", () => {
    expect(checkValue(wrapper, "touched")).toBe("false");
  });
  test("when touch, touched will be true", async () => {
    await triggerEvent(wrapper, "touch");
    expect(checkValue(wrapper, "touched")).toBe("true");
  });
  test("when validate, error list will have contents", async () => {
    await triggerEvent(wrapper, "validate");
    expect(checkValue(wrapper, "errorList-obj").length).toBeGreaterThan(2);
  });
});