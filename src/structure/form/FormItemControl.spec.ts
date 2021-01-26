import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";
import {
  getUnit,
  checkValue,
  triggerEvent,
  getCompoNested,
} from "../../ServiceTestUtils";
import FormControl from "./FormControl";
import FormItemControl from "./FormItemControl";

const FormFormula = function () {
  return FormControl(
    ref({ name: "", password: "" }),
    ref({ name: { required: true, message: "必填" } })
  );
};

const rootUnit = getUnit(FormFormula, [], {});
const leafUnit = getUnit(FormItemControl, [["name"], "test default"], {});

describe("FormControl", () => {
  let mockCompo = getCompoNested(rootUnit, leafUnit);
  let wrapper = mount(mockCompo);
  test("is a Vue instance", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  test("touched false when constructed", () => {
    expect(checkValue(wrapper, "touched-1")).toBe("false");
  });
  test("current model will set to test default", async () => {
    await nextTick();
    expect(checkValue(wrapper, "model-1")).toBe("test default");
  });
  test("after touched, set touched true", async () => {
    await triggerEvent(wrapper, "touch");
    expect(checkValue(wrapper, "touched-1")).toBe("true");
    expect(checkValue(wrapper, "errors-obj-1").length).toBeLessThan(3);
  });
});
