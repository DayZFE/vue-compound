import { ValidateError } from "async-validator";
import { computed, provide, ref, watch } from "vue";
import { Aggregation } from "vue-injection-helper";
import { FORM_SERVICE_TOKEN } from "./FormService";

export const FORM_ITEM_SERVICE_TOKEN = "logic-form-item-service";
export default function FormItemService(name: string) {
  const canShowError = Aggregation<boolean>(
    FORM_SERVICE_TOKEN,
    ["canShowError", "value"],
    false
  );
  const errors = Aggregation<ValidateError[] | undefined>(
    FORM_SERVICE_TOKEN,
    ["errorList", "value", name],
    undefined
  );
  provide(FORM_ITEM_SERVICE_TOKEN, { name });
  return {
    canShowError,
    errors,
  };
}
