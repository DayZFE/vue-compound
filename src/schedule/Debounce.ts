import { ref, Ref, watch } from "vue";

/**
 * emitting value deboucely
 *
 * @export
 * @template T
 * @param {Ref<T>} source
 * @param {number} timeout
 * @return {*}
 */
export default function Debounce<T>(source: Ref<T>, timeout: number) {
  const debouncedRef = ref<T>() as Ref<T>;
  debouncedRef.value = source.value;
  const canTrig = ref<boolean>(true);
  watch(source, () => {
    if (canTrig) {
      canTrig.value = false;
      setTimeout(() => {
        // just directly get source value
        debouncedRef.value = source.value;
        canTrig.value = true;
      }, timeout);
    }
  });
  return debouncedRef;
}
