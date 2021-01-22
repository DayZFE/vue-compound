import { computed, Ref, ref } from "vue";
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
  const focused = ref<boolean>(false);
  const valid = ref<boolean>(false);
  const disabled = ref<boolean>(false);
  const errorList = ref<FieldErrorList>({});
  const validator = computed(() => new Schema(rules ? rules.value : {}));
  const canShowError = computed(() => !valid.value && touched.value);
  const touch = () => {
    touched.value = true;
  };
  const validate = () => {
    return new Promise((res, rej) => {
      validator.value.validate(model.value, {}, (errors, fileds) => {
        if (errors) {
          errorList.value = fileds;
          valid.value = false;
          rej(errors);
        } else {
          valid.value = true;
          (res as any)();
        }
      });
    });
  };
  const aggregation = {
    touched,
    focused,
    valid,
    disabled,
    errorList,
    validator,
    canShowError,
    touch,
    validate,
  };
  defineModule(aggregation, "logic-form-control", token);
  return aggregation;
}
