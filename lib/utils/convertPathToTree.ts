import { filePathsToTree, treeToString } from "file-paths-to-tree";

export function convertPathToTree(path: string[]) {
  const compactTree = treeToString(filePathsToTree(path));
  return compactTree;
}
