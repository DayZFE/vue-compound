<script lang="ts">
import { provide, ref } from "vue";
import { Aggregation } from "vue-injection-helper";
import FormService, { FORM_SERVICE_TOKEN } from "src/form/FormService";
export default {
  name: "example-subform",
  props: {
    name: String,
  },
  setup(props) {
    const modelKeyList = ["model", "value"];
    const rulesKeyList = ["rules", "value"];
    const model = Aggregation(
      FORM_SERVICE_TOKEN,
      props.name ? [...modelKeyList, props.name] : modelKeyList,
      {}
    );
    const rules = Aggregation(
      FORM_SERVICE_TOKEN,
      props.name ? [...rulesKeyList, props.name] : rulesKeyList,
      {}
    );
    const formService = FormService(model, rules);
    provide(FORM_SERVICE_TOKEN, formService);
  },
};
</script>

<template>
  <slot></slot>
</template>