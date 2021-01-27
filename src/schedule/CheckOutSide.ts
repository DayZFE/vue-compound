import { ref, watch } from "vue";
import { cataly } from "vue-poly";
import FromEvent from "./FromEvent";

const cataFromEvent = cataly(FromEvent);
function checkOutSide(fromEvent: typeof cataFromEvent, cb?: () => void) {
  const { currentEvent, currentNode } = fromEvent;
  const ifOutside = ref<boolean>(false);
  watch([currentEvent, currentNode], ([event, node]) => {
    if (!event || !node) return;
    if (!node.contains(event.target as any)) {
      if (cb) cb();
      ifOutside.value = true;
    } else {
      ifOutside.value = false;
    }
  });
  return ifOutside;
}
