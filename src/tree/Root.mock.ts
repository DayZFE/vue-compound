import { defineComponent, ref, h } from "vue";

export default defineComponent({
  setup() {
    return { test: ref("check") };
  },
  template: `
  <div>
    <span id="test">{{test}}</span>
  </div>
  `,
});
