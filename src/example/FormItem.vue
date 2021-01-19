
<script>
import { watch } from "vue";
import { Aggregation } from "vue-injection-helper";
import FormItemService from "../form/FormItemService";
export default {
  name: "example-form-item",
  props: { name: String, hint: String, label: String },
  setup(props) {
    const formItemService = FormItemService(props.name);
    return { ...formItemService };
  },
};
</script>

<template>
  <div>{{ label }}</div>
  <div v-if="!useInputErrorAndHint && hint">
    {{ hint }}
  </div>
  <slot></slot>
  <div v-show="canItemShowError" style="color: red">
    {{ errors?.[0]?.message }}
  </div>
</template>

<style>
</style>