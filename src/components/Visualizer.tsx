import { use, useState } from "react";
import TreeNodeComponent from "./TreeNodeComponent";


// TreeNode type
export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};



export default function TreeVisualizer() {
  const [visited, setVisited] = useState<Set<string>>(new Set());

const sampleTree: TreeNode = {
  id: '1',
  label: 'A',
  children: [
    {
      id: '2',
      label: 'B',
      children: [
        { id: '4', label: 'D' },
        { id: '5', label: 'E' },
      ],
    },
    {
      id: '3',
      label: 'C',
      children: [{ id: '6', label: 'F' }],
    },
  ],
};

const dfsTraverse = async (
  node: TreeNode,
  visit: (id: string) => void,
  visited = new Set<string>()
) => {
  if (!node || visited.has(node.id)) return;
  visit(node.id);
  visited.add(node.id);
  await new Promise((r) => setTimeout(r, 500));
  for (const child of node.children || []) {
    await dfsTraverse(child, visit, visited);
  }
};

  const startDFS = async () => {
    setVisited(new Set());
    await dfsTraverse(sampleTree, (id:any) => {
      setVisited((prev) => new Set(prev).add(id));
    });
  };

  return (
    <div>
      <button onClick={startDFS} style={{ marginBottom: '16px' }}>
        Start DFS
      </button>
      <TreeNodeComponent node={sampleTree} visitedIds={visited} />
    </div>
  );
}