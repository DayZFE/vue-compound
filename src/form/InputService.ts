import { inject } from "vue";
import { Aggregation } from "vue-injection-helper";
import { FORM_ITEM_SERVICE_TOKEN } from "./FormItemService";
import { FORM_SERVICE_TOKEN } from "./FormService";

export default function InputService<T>(initialValue: T) {
  const touch = Aggregation(FORM_SERVICE_TOKEN, ["touch"], () => {}, true);
  const name = Aggregation<string>(FORM_ITEM_SERVICE_TOKEN, ["name"], "");
  const model = Aggregation<T>(
    FORM_SERVICE_TOKEN,
    ["model", "value", name.value],
    initialValue
  );
  const useInputErrorAndHint = Aggregation<boolean>(
    FORM_ITEM_SERVICE_TOKEN,
    ["useInputErrorAndHint", "value"],
    false
  );
  return {
    touch,
    name,
    model,
    useInputErrorAndHint,
  };
}
