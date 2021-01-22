import { ref, watch } from "vue";
import { aggregateEvent, aggregateRef } from "vue-injection-helper";

/**
 * input control
 *
 * @export
 * @param {*} [defaultValue]
 * @param {string} [token]
 * @returns
 */
export default function InputControl(defaultValue?: any, token?: string) {
  const usedToken = token || "__logic-form-control";
  const keyList = aggregateRef("__logic-form-item-control", ["keyList"], []);
  const aggregation = {
    model: aggregateRef(
      usedToken,
      ["model", "value", ...keyList.value],
      undefined as any
    ),
    errors: aggregateRef(
      usedToken,
      ["errorList", "value", ...keyList.value],
      []
    ),
    disabled: aggregateRef(usedToken, ["disabled", "value"], false),
    touched: aggregateRef(usedToken, ["touched", "value"], false),
    touch: aggregateEvent(usedToken, ["touch"]),
    focusedKeyList: aggregateRef(
      usedToken,
      ["focusedKeyList", "value"],
      [] as string[]
    ),
  };
  // default value is superior than all
  if (defaultValue !== undefined) {
    aggregation.model.value = defaultValue;
  }
  // independent focused
  const focused = ref(false);
  // focus when touch and set focusedKey
  const focus = () => {
    focused.value = true;
    aggregation.touch();
    const value = keyList.value.join("-");
    const exist = aggregation.focusedKeyList.value.find((el) => el === value);
    if (!exist) aggregation.focusedKeyList.value.push(value);
  };

  const blur = () => {
    focused.value = false;
    aggregation.focusedKeyList.value = aggregation.focusedKeyList.value.filter(
      (el) => el !== keyList.value.join("-")
    );
  };

  return { ...aggregation, focused, focus, blur };
}
