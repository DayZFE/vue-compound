
<script lang="ts">
import { inject, provide, watch } from "vue";
import {
  Aggregation,
  getMockInstance,
  getInjectionToken,
} from "vue-injection-helper";
import FormService, { FORM_SERVICE_TOKEN } from "../form/FormService";
export default {
  name: "example-form",
  props: { token: String },
  setup(props) {
    const service = inject(props.token || FORM_SERVICE_TOKEN, undefined);
    if (service === undefined) {
      throw new Error("[vue-logic form] form service must be called");
    }
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