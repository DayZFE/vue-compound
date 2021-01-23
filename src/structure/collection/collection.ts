import { Ref, shallowRef, watch } from "vue";
import { defineModule } from "vue-injection-helper";
import { TrackBy, TrackingKey } from "./types";


interface CollectionParameters<T, Multiple extends boolean> {
  dataSource: Ref<T[]>;
  trackBy: TrackBy<T>;
  token?: string;
  multiple?: Multiple;
}

/**
 * create a selectKey logic, this logic returns an array of keys
 * @param {string[]} keys 
 * @param {TrackBy} trackBy 
 * @param {boolean} multiple 
 * @returns selectKeys
 */
function createSelectKeys<T, Multiple extends boolean>(
  keys: TrackingKey[], 
  trackBy: TrackBy<T>, 
  multiple: Multiple
) {
  let selectKeys: (items: T[]) => TrackingKey[];
  if (multiple) {
    selectKeys = (items: T[]) => {
      return Array.from(new Set([...items.map(trackBy), ...keys]))
    };
  } else {
    selectKeys = (items: T[]) => {
      const key = items[0];
      return key ? [trackBy(key)] : [];
    };
  }
  return selectKeys;
}

/**
 * create a collection selection logic.
 * 
 * @param parameters the CollectionParameters
 * 
 * @param {T} parameters.dataSource
 * @param {TrackBy} parameters.trackBy
 * @param {string} [parameters.token = '']
 * @param {boolean} [parameters.multiple = false]
 */
export function collection<T, Multiple extends boolean = false>(
  this: void, 
  parameters: CollectionParameters<T, Multiple>
) {
  const {dataSource, trackBy, token = '', multiple = false} = parameters;
  const selectedKeys = shallowRef<TrackingKey[]>([]);

  watch(dataSource, () => {
    selectedKeys.value = [];
  });

  const selectKeys = createSelectKeys(selectedKeys.value, trackBy, multiple);

  const select = (...items: T[]) => {
    selectedKeys.value = selectKeys(items);
  }

  const deselect = (...items: T[]) => {
    const toDeselectKeys = items.map(trackBy);
    selectedKeys.value = selectedKeys.value.filter((key) => !toDeselectKeys.includes(key));
  }

  const aggregation = {
    selectedKeys,
    select,
    deselect
  }

  defineModule(aggregation, '__$collection', token);
  return aggregation;
}
