import { computed, Ref, ref, watch } from "vue";
import Schema, { FieldErrorList, Rules } from "async-validator";
import { defineModule } from "vue-injection-helper";
/**
 * form control structure
 *
 * @export
 * @template T
 * @param {Ref<T>} model
 * @param {Ref<Rules>} [rules]
 * @param {string} [token=""]
 * @returns
 */
export default function FormControl<T>(
  model: Ref<T>,
  rules?: Ref<Rules>,
  token: string = ""
) {
  const touched = ref<boolean>(false);
  const focusedKeyList = ref<string[]>([]);
  const valid = ref<boolean>(false);
  const disabled = ref<boolean>(false);
  const errorList = ref<FieldErrorList>({});
  const validator = computed(() => new Schema(rules ? rules.value : {}));
  const touch = () => {
    touched.value = true;
  };
  const validate = () => {
    return new Promise((res) => {
      validator.value.validate(model.value, {}, (errors, fileds) => {
        if (errors) {
          errorList.value = fileds;
          valid.value = false;
        } else {
          valid.value = true;
          (res as any)();
        }
      });
    });
  };
  const focused = computed(() => focusedKeyList.value.length > 0);
  const aggregation = {
    model,
    rules,
    touched,
    focused,
    focusedKeyList,
    valid,
    disabled,
    errorList,
    validator,
    touch,
    validate,
  };
  defineModule(aggregation, "__logic-form-control", token);
  return aggregation;
}
