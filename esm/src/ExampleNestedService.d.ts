export declare function RootService(): {
    test: import("vue").Ref<string>;
    test2: import("vue").Ref<string>;
    changeTest: () => void;
};
export declare function LeafService(): {
    test: import("vue").Ref<string>;
    changeTest: import("vue-injection-helper").AggregationFunc | (() => void);
};
