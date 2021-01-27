import { ref, toRef } from "vue";
import { bond, PolyID } from "vue-poly";
import FormControl from "./structure/form/FormControl";

function SomeComponentFunction() {
  const form = FormControl(
    ref({
      name: "",
      password: "",
    }),
    ref({ name: { required: true, message: "required" } })
  );
  const newForm = FormControl(ref({ someItem: "" }), ref({}));
  return { form, newForm };
}

function SomeForm(props: { model: any; rules: any; token: PolyID }) {
  const formModel = toRef(props, "model");
  const rules = toRef(props, "rules");
  const poly = FormControl(formModel, rules, props.token);
  return poly;
}
