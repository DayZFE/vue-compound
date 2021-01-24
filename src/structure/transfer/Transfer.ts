import { computed, Ref, shallowRef } from "vue";
import { aggregateRef, defineModule, LinkToken } from "vue-injection-helper";
import { Collection } from "../collection/Collection";

type TrackKey = (string | number);

export type TrackBy<T> = (this: void, data: T) => TrackKey;

export function Transfer<T>(
  dataSource: Ref<T[]>, 
  trackBy: TrackBy<T>,
  token: LinkToken = '',
) {

  
  const targetKeys = shallowRef<TrackKey[]>([]);

  const leftItems = computed(() => {
    return dataSource.value.filter((data) => {
      return !targetKeys.value.includes(trackBy(data));
    });
  });

  const rightItems = computed(() => {
    return dataSource.value.filter((data) => {
      return targetKeys.value.includes(trackBy(data));
    });
  });

  const left = Collection({dataSource: leftItems, trackBy, token: '__logic-transfer-left', multiple: true});
  const right = Collection({dataSource: rightItems, trackBy, token: '__logic-transfer-right', multiple: true});

  
  const addTo = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      const rightValues = right.selectedKeys.value;
      targetKeys.value = targetKeys.value.filter((key) => {
        return rightValues.indexOf(key) === -1;
      });
    } else {
      targetKeys.value = Array.from(new Set([...left.selectedKeys.value, ...targetKeys.value]));
    }
  };

  const aggregation = {
    leftItems,
    rightItems,
    addTo,
    left,
    right
  }
  defineModule(aggregation, '__logic-transfer', token);

  return aggregation;
}

