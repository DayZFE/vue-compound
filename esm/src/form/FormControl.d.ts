import { Ref } from "vue";
import Schema, { Rules } from "async-validator";
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
export default function FormControl<T>(model: Ref<T>, rules?: Ref<Rules>, token?: string): {
    touched: Ref<boolean>;
    focused: Ref<boolean>;
    valid: Ref<boolean>;
    disabled: Ref<boolean>;
    errorList: Ref<{
        [x: string]: {
            message: string;
            field: string;
        }[];
    }>;
    validator: import("vue").ComputedRef<Schema>;
    canShowError: import("vue").ComputedRef<boolean>;
    touch: () => void;
    validate: () => Promise<unknown>;
};
