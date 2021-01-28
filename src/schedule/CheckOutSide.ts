import { onUnmounted, ref } from "vue";
import { cataly } from "vue-poly";
import FromEvent from "./FromEvent";

const cataFromEvent = cataly(FromEvent);

/**
 * check out that if some event hppend out side of certian event
 *
 * @export
 * @param {typeof cataFromEvent} fromEvent
 * @param {() => void} [cb]
 * @returns
 */
export default function checkOutSide(
  fromEvent: typeof cataFromEvent,
  cb?: () => void
) {
  const ifOutside = ref<boolean>(false);
  const handleDocEvent = (e: Event) => {
    if (!fromEvent.currentNode.value) return;
    if (!fromEvent.currentNode.value.contains(e.target as any)) {
      if (cb) cb();
      ifOutside.value = true;
    } else {
      ifOutside.value = false;
    }
  };
  document.addEventListener(fromEvent.eventName, handleDocEvent);
  onUnmounted(() => {
    document.removeEventListener(fromEvent.eventName, handleDocEvent);
  });
  return ifOutside;
}
