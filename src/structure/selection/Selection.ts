import { isRef, ref, Ref, unref, watch } from "vue";
import { defineModule } from "vue-injection-helper";
import { TrackBy, TrackingKey } from "./types";


interface SelectionParameters<T> {
  dataSource: Ref<T[]>;
  trackBy: TrackBy<T>;
  multiple?: boolean | Ref<boolean>;
}

/**
 * create a selection logic.
 * 
 * @param parameters the CollectionParameters
 * 
 * @param {T} parameters.dataSource
 * @param {TrackBy} parameters.trackBy
 * @param {LinkToken} [parameters.token = '']
 * @param {boolean} [parameters.multiple = false]
 */
export function Selection<T>(
  this: void, 
  parameters: SelectionParameters<T>
) {
  const { dataSource, trackBy, multiple = false } = parameters;
  const selectedKeys = ref<TrackingKey[]>([]);

  watch(dataSource, () => {
    selectedKeys.value = [];
  });

  if (isRef(multiple)) { 
    watch(multiple, (value) => {
      // Multiple to single, should let keys array be empty.
      if (!value) {
        selectedKeys.value = [];
      }
    });
  }

  // flexible design
  const selectKeys = (keys: TrackingKey[], items: T[]) => {
    if(unref(multiple)) {
      return Array.from(new Set([...items.map(trackBy), ...keys]));
    } else {
      const key = items[0];
      return key ? [trackBy(key)] : [];
    }
  }

  const select = (...items: T[]) => {
    selectedKeys.value = selectKeys(selectedKeys.value, items);
  }

  const deselect = (...items: T[]) => {
    const toDeselectKeys = items.map(trackBy);
    selectedKeys.value = selectedKeys.value.filter((key) => !toDeselectKeys.includes(key));
  }

  const isSelected = (item: T) => {
    const key = trackBy(item);
    return selectedKeys.value.includes(key);
  }

  const selectAll = () => {
    selectedKeys.value = dataSource.value.map(trackBy);
  }

  const aggregation = {
    selectedKeys,
    select,
    deselect,
    isSelected,
    selectAll
  }

  defineModule(aggregation, '__logic-selection');
  return aggregation;
}
