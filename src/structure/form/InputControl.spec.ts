import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";
import {
  getUnit,
  checkValue,
  triggerEvent,
  getCompoNested,
  wait,
} from "../../ServiceTestUtils";
import FormControl from "./FormControl";
import FormItemControl from "./FormItemControl";
import InputControl from "./InputControl";

const FormFormula = function () {
  return FormControl(
    ref({ name: "", password: "" }),
    ref({ name: { required: true, message: "必填" } })
  );
};

const rootUnit = getUnit(FormFormula, [], {});

const middleUnit = getUnit(FormItemControl, [["name"], "test default"], {});

const leafUnit = getUnit(InputControl, ["input default"], {});

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
  test("bondations should be 9", async () => {
    await wait(2);
    expect(checkValue(wrapper, "bondLength")).toBe("8");
  });
  test("after focus,  touched true", async () => {
    await triggerEvent(wrapper, "focus-2");
    expect(checkValue(wrapper, "touched-2")).toBe("true");
    expect(checkValue(wrapper, "focused-2")).toBe("true");
    await triggerEvent(wrapper, "validate");
    expect(checkValue(wrapper, "errors-obj-2").length).toBeLessThan(3);
    leafUnit.eventProps["setPolyValue"] = {
      queryPath: ["model", "value"],
      value: "",
    };
    await triggerEvent(wrapper, "setValue-2");
    await triggerEvent(wrapper, "validate");
    expect(checkValue(wrapper, "errors-obj-2").length).toBeGreaterThan(3);
  });
});
