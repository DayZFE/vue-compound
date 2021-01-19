
<script lang="ts">
import { ref } from "vue";
import Form from "./example/Form.vue";
import FormItem from "./example/FormItem.vue";
import Input from "./example/Input.vue";
import FormService from "./form/FormService";

export default {
  name: "app",
  components: {
    "logic-form": Form,
    "logic-form-item": FormItem,
    "logic-input": Input,
  },
  setup() {
    // const formService = FormService(
    //   ref({ name: "", test: "hahaha" }),
    //   ref({ name: [{ required: true, message: "this is requred" }] })
    // );
    // return { token: formService.token };
  },
};
</script>
<template>
  <logic-form>
    <div style="margin-bottom: 10px">
      <logic-form-item label="test" name="name">
        <logic-input />
      </logic-form-item>
    </div>
    <div style="box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5); padding: 4px">
      <logic-form-item label="hahah" name="hahaha">
        <div style="border: 2px solid rgba(0, 0, 0, 0.2); padding: 10px">
          <logic-input />
        </div>
      </logic-form-item>
    </div>
  </logic-form>
</template>

<style>
</style>