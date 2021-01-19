
<script lang="ts">
import { ref, watch } from "vue";
import Form from "./example/Form.vue";
import FormItem from "./example/FormItem.vue";
import Input from "./example/Input.vue";
import FormService from "./form/FormService";
import SubForm from "./example/SubForm.vue";

export default {
  name: "app",
  components: {
    "logic-form": Form,
    "logic-form-item": FormItem,
    "logic-input": Input,
    "logic-sub-form": SubForm,
  },
  setup() {
    const model = ref({
      name: "",
      test: "hahaha",
      deep: [""],
    });
    const formService = FormService(
      model,
      ref({ name: [{ required: true, message: "this is requred" }] })
    );
    watch(model, (res) => console.log(res), { deep: true });
    return { token: formService.token, model };
  },
};
</script>
<template>
  <logic-form :token="token">
    <div>
      <logic-form-item label="test" name="name">
        <logic-input />
      </logic-form-item>
    </div>
    <logic-form-item label="hahah" name="test">
      <logic-input />
    </logic-form-item>
    <logic-sub-form name="deep">
      <logic-form-item name="0">
        <div>
          <logic-input />
        </div>
      </logic-form-item>
    </logic-sub-form>
  </logic-form>
  <div>{{ model.test }}</div>
</template>

<style>
</style>