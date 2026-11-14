import { filePathsToTree, treeToString } from "file-paths-to-tree";

export function convertPathToTree(paths: string[]) {
  return treeToString(filePathsToTree(paths));
}
