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
export default function FormItemControl(
  keyList: string[],
  defaultValue?: any,
  token?: string
) {
  const usedToken = token || "__logic-form-control";
  const partial = {
    errorsList: bond(
      usedToken,
      ["errorList", "value"],
      ref<FieldErrorList>({})
    ),
    touched: bond(usedToken, ["touched", "value"], ref(false)),
    model: bond(usedToken, ["model", "value", ...keyList], ref<any>(null)),
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
