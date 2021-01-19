<script lang="ts">
import { watch } from "vue";
import InputService from "../form/InputService";
export default {
  name: "example-input",
  props: { modelValue: String },
  setup(props, ctx) {
    const inputService = InputService("");
    watch(props, (res) => {
      if (res.modelValue) {
        inputService.model.value = res.modelValue;
      }
    });
    const changeValue = (e: InputEvent) => {
      const newVal = (e.target as any).value;
      inputService.model.value = newVal;
      ctx.emit("update:modelValue", newVal);
    };
    const touch = () => {
      inputService.touch.value();
    };
    return { value: inputService.model, changeValue, touch };
  },
};
</script>

<template>
  <input :value="value" @input="changeValue" @focus="touch" />
</template>

<style>
</style>