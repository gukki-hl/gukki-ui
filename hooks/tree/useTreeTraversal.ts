import { ref } from 'vue'
interface TreeNode {
  id: string
  children?: TreeNode[]
}

export function useTreeTraversal() {
  const childKeys = ref<string[]>([])
  
// 递归过滤有子节点的父节点id
  const traverseTree = (tree: TreeNode[]) => {
    tree.forEach((node) => {
      if (node.children && node.children.length > 0) {
        traverseTree(node.children)
      } else {
        childKeys.value.push(node.id)
      }
    })
  }
  return { childKeys, traverseTree }
  
}
