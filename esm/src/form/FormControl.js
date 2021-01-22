import { computed, ref } from "vue";
import Schema from "async-validator";
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
export default function FormControl(model, rules, token = "") {
    const touched = ref(false);
    const focused = ref(false);
    const valid = ref(false);
    const disabled = ref(false);
    const errorList = ref({});
    const validator = computed(() => new Schema(rules ? rules.value : {}));
    const canShowError = computed(() => !valid.value && touched.value);
    const touch = () => {
        touched.value = true;
    };
    const validate = () => {
        return new Promise((res) => {
            validator.value.validate(model.value, {}, (errors, fileds) => {
                if (errors) {
                    errorList.value = fileds;
                    valid.value = false;
                }
                else {
                    valid.value = true;
                    res();
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
//# sourceMappingURL=FormControl.js.map