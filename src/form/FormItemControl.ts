import { aggregateRef, defineModule } from "vue-injection-helper";

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
  const aggregation = {
    errors: aggregateRef(usedToken, ["errorList", "value", ...keyList], []),
    touched: aggregateRef(usedToken, ["touched", "value"], false),
    model: aggregateRef(
      usedToken,
      ["model", "value", ...keyList],
      undefined as any
    ),
  };
  // default value is superior than form model
  if (defaultValue !== undefined) {
    aggregation.model.value = defaultValue;
  }
  defineModule({ keyList }, "__logic-form-item-control");
  return aggregation;
}
