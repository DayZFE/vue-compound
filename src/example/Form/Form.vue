
<script lang="ts">
import { inject, provide, ref, watch } from "vue";
import {
  Aggregation,
  getMockInstance,
  getInjectionToken,
  OptionalInjectionModule,
} from "vue-injection-helper";
import FormService, { FORM_SERVICE_TOKEN } from "src/form/FormService";
export default {
  name: "example-form",
  props: { token: String },
  setup(props) {
    const service = OptionalInjectionModule(
      FormService(ref({}), ref({})),
      props.token || FORM_SERVICE_TOKEN,
      true
    );
    // specify certain form
    provide(FORM_SERVICE_TOKEN, service);
    return { service };
  },
};
</script>

<template>
  <form>
    <slot></slot>
  </form>
</template>

<style>
</style>