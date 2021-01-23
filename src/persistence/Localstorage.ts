import { Ref, ref, watch } from "vue";

/**
 * localstorage agent
 *
 * @export
 * @template T
 * @param {string} key
 * @param {T} defaultValue
 * @return {*}
 */
export default function Localstorage<T>(key: string, defaultValue: T) {
  const localRef = ref<T>() as Ref<T>;
  localRef.value = defaultValue;
  const stored = localStorage.getItem(key);
  if (stored) {
    localRef.value = JSON.parse(stored);
  }
  watch(localRef, (val) => {
    if (val === undefined) return;
    localStorage.setItem(key, JSON.stringify(val));
  });
  return localRef;
}
