import { ref } from "vue";
import { bond, definePoly } from "vue-poly";
import { ValidateError } from "async-validator";

/**
 * input control
 *
 * @export
 * @param {*} [defaultValue]
 * @param {string} [token]
 * @returns
 */
export default function InputControl(defaultValue?: any) {
  const token = "__logic-form-control";
  const keyList = bond("__logic-form-item-control", ["keyList"], []);
  const errors = bond(
    "__logic-form-item-control",
    ["errors", "value"],
    ref<ValidateError[]>([])
  );
  const partial = {
    model: bond(token, ["model", "value", ...keyList], ref<any>(null)),
    disabled: bond(token, ["disabled", "value"], ref(false)),
    touched: bond(token, ["touched", "value"], ref(false)),
    touch: bond(token, "touch", () => {}),
    focusedKeyList: bond(token, ["focusedKeyList", "value"], ref<string[]>([])),
  };
  // default value is superior than all
  if (defaultValue !== undefined) {
    partial.model.value = defaultValue;
  }
  // independent focused
  const focused = ref(false);
  // focus when touch and set focusedKey
  const focus = () => {
    focused.value = true;
    partial.touch();
    const value = keyList.join("-");
    const exist = partial.focusedKeyList.value.find((el: any) => el === value);
    if (!exist) partial.focusedKeyList.value.push(value);
  };

  const blur = () => {
    focused.value = false;
    partial.focusedKeyList.value = partial.focusedKeyList.value.filter(
      (el: any) => el !== keyList.join("-")
    );
  };
  return definePoly({
    logicId: "__logic-input-control",
    ...partial,
    focused,
    focus,
    blur,
    errors,
  });
}
