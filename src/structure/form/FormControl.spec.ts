import { mount } from "@vue/test-utils";
import { ref } from "vue";
import {
  TestUnit,
  getCompo,
  checkValue,
  triggerEvent,
} from "../../ServiceTestUtils";
import FormControl from "./FormControl";

const Service = function () {
  return FormControl(
    ref({ name: "", password: "" }),
    ref({ name: { required: true, message: "必填" } })
  );
};

const unit = new TestUnit(Service);

describe("FormControl", () => {
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
