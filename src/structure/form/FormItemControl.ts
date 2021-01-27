import { FieldErrorList } from "async-validator";
import { computed, ref } from "vue";
import { definePoly, bond, bondGet } from "vue-poly";

/**
 * form item controll
 * just to show errors and bind the default value
 *
 * @export
 * @param {string[]} keyList
 * @param {*} defaultValue
 * @param {string} [token]
 * @returns
 */
export default function FormItemControl(keyList: string[], defaultValue?: any) {
  const token = "__logic-form-control";
  const partial = {
    errorsList: bond(token, ["errorList", "value"], ref<FieldErrorList>({})),
    touched: bond(token, ["touched", "value"], ref(false)),
    model: bond(token, ["model", "value", ...keyList], ref<any>(null)),
  };
  // need to handle all the undefined
  const errors = computed(
    () => bondGet(partial.errorsList, ["value", ...keyList]) || []
  );
  // default value is superior than form model
  if (defaultValue !== undefined) {
    partial.model.value = defaultValue;
  }
  return definePoly({
    id: "__logic-form-item-control",
    keyList,
    ...partial,
    errors,
  });
}
