import { computed, Ref, shallowRef } from "vue";
import { definePoly } from "vue-poly";
import { Selection, TrackBy, TrackingKey } from "../selection";

/**
 * Create a Transfer logic
 * Transfer has two arrays of items.
 * They are splited by a array of keys. 
 * The one is left items which not contain keys.
 * The other is right items which contain keys.
 * @param {Ref<T[]>} dataSource 
 * @param {TrackBy<T>} trackBy 
 */
export function Transfer<T>(
  dataSource: Ref<T[]>, 
  trackBy: TrackBy<T>,
) {

  const targetKeys = shallowRef<TrackingKey[]>([]);

  const leftItems = computed(() => {
    return dataSource.value.filter((data) => {
      const key = trackBy(data);
      return !targetKeys.value.includes(key);
    });
  });

  const rightItems = computed(() => {
    return dataSource.value.filter((data) => {
      const key = trackBy(data);
      return targetKeys.value.includes(key);
    });
  });

  // use selection
  const left = Selection({dataSource: leftItems, trackBy, multiple: true});
  const right = Selection({dataSource: rightItems, trackBy, multiple: true});
  
  const addTo = (direction: 'left' | 'right') => {
    const keys = targetKeys.value;
    if (direction === 'left') {
      const rightValues = right.selectedKeys.value;
      targetKeys.value = keys.filter((key) => !rightValues.includes(key));
    } else {
      targetKeys.value = Array.from(new Set([...left.selectedKeys.value, ...keys]));
    }
  };

  return definePoly({
    id: '__logic-transfer',
    leftItems,
    rightItems,
    left,
    right,
    addTo,
  });
}

