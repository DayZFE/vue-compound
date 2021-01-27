import { Ref, watch, ref, computed } from "vue";
import { BindingNode } from "../types";

export default function FromEvent(
  domRef: Ref<BindingNode>,
  eventName: string,
  cb?: (event: Event) => void
) {
  let currentNode = ref<Element | null>(null);
  let currentCb: ((event: Event) => void) | null = null;
  const currentEvent = ref<Event | null>(null);

  const remove = () => {
    if (!currentNode.value || !currentCb) return;
    currentNode.value.removeEventListener(eventName, currentCb);
    currentCb = null;
  };

  watch(domRef, (domNode, _, onInvalid) => {
    if (domNode instanceof Element) {
      currentNode.value = domNode;
    } else if (domNode) {
      currentNode.value = domNode.$el;
    } else {
      return;
    }
    if (currentNode.value) {
      if (currentCb) {
        remove();
      }
      currentCb = (e: Event) => {
        currentEvent.value = e;
        if (cb) cb(e);
      };
      currentNode.value.addEventListener(eventName, currentCb);
    }
    onInvalid(() => {
      remove();
    });
  });

  const listening = computed(() => currentCb !== null);
  return {
    listening,
    remove,
    currentEvent,
    currentNode,
    eventName,
    domRef,
  };
}
