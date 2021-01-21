import { provide } from "vue";

export class TreeNode {
  label: string;
  key: string;
  value: string;
  layer: number = 0;
  children: TreeNode[] = [];
  constructor(label: string, value: string, key: string) {
    this.label = label;
    this.value = value;
    this.key = key;
  }
}

export default function TreeService(
  treeNode: TreeNode,
  layer: number,
  key: string
) {
  // provide('logic-tree-'+layer+'key', )
  return { test: "test" };
}
