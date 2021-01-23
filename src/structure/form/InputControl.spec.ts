import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";
import {
  TestUnit,
  checkValue,
  triggerEvent,
  getCompoNested,
} from "../../ServiceTestUtils";
import FormControl from "./FormControl";
import FormItemControl from "./FormItemControl";
import InputControl from "./InputControl";

const FormService = function () {
  return FormControl(
    ref({ name: "", password: "" }),
    ref({ name: { required: true, message: "必填" } })
  );
};

const rootUnit = new TestUnit(FormService);

const middleUnit = new TestUnit(FormItemControl);
middleUnit.props = [["name"], "test default"];

const leafUnit = new TestUnit(InputControl);
leafUnit.props = ["input default"];

describe("FormControl", () => {
  let mockCompo = getCompoNested(rootUnit, middleUnit, leafUnit);
  let wrapper = mount(mockCompo);
  test("is a Vue instance", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  test("touched false when constructed", () => {
    expect(checkValue(wrapper, "touched-2")).toBe("false");
  });
  test("current model will set to test default", async () => {
    await nextTick();
    expect(checkValue(wrapper, "model-2")).toBe("input default");
  });
  test("after focus,  touched true", async () => {
    await triggerEvent(wrapper, "focus-2");
    expect(checkValue(wrapper, "touched-2")).toBe("true");
    expect(checkValue(wrapper, "focused-2")).toBe("true");
    await triggerEvent(wrapper, "validate");
    expect(checkValue(wrapper, "errors-2").length).toBeLessThan(3);
    leafUnit.eventPropsList["setValue"] = {
      keyPath: ["model", "value"],
      value: "",
    };
    await triggerEvent(wrapper, "setValue-2");
    await triggerEvent(wrapper, "validate");
    expect(checkValue(wrapper, "errors-2").length).toBeGreaterThan(3);
  });
});
