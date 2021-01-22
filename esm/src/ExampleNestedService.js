import { ref } from "vue";
import { aggregateEvent, aggregateRef, defineModule, } from "vue-injection-helper";
export function RootService() {
    const test = ref("test");
    const test2 = ref("test2");
    const changeTest = () => {
        test.value = "new test";
    };
    const aggregation = { test, test2, changeTest };
    defineModule(aggregation, "test-token");
    return aggregation;
}
export function LeafService() {
    const aggregation = {
        test: aggregateRef("test-token", ["test", "value"], "default test"),
        changeTest: aggregateEvent("test-token", ["changeTest"]),
    };
    return aggregation;
}
//# sourceMappingURL=ExampleNestedService.js.map