import { computed, inject, provide, ref, Ref, watch } from "vue";
import Schema, { FieldErrorList, Rules } from "async-validator";

export const FORM_SERVICE_TOKEN = "logic-form-service";

export default function FormService<T>(
  model: Ref<T>,
  rules: Ref<Rules>,
  checkOnUpdate: Ref<boolean> = ref(true)
) {
  const initialValue = model.value;
  const validator = computed(() =>
    rules.value ? new Schema(rules.value) : { validate: () => {} }
  );
  const errorList = ref<FieldErrorList>({});
  // if form item input has been touched
  const touched = ref<boolean>(false);
  const valid = ref<boolean>(true);
  // can children display item show the errors
  const canShowError = computed(() => touched.value && !valid.value);
  // check the value validation if checkOnUpdate
  watch(
    model,
    (res) => {
      if (!checkOnUpdate.value) return;
      validator.value.validate(res, {}, (errors, filedErrorList) => {
        if (errors) {
          valid.value = false;
          errorList.value = filedErrorList;
        } else {
          valid.value = true;
        }
      });
    },
    { deep: true }
  );
  // reset form model
  const reset = () => {
    model.value = initialValue;
    touched.value = false;
    valid.value = false;
    errorList.value = {};
  };
  // touch form
  const touch = () => {
    if (touched.value === false) {
      touched.value = true;
    }
  };
  const service = {
    token: "[logic-form-user]" + Math.random() + "_" + Date.now(),
    initialValue,
    model,
    validator,
    errorList,
    touched,
    valid,
    canShowError,
    reset,
    touch,
  };
  provide(service.token, service);
  provide(FORM_SERVICE_TOKEN, service);
  return service;
}
