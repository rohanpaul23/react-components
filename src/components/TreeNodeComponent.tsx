import type { TreeNode } from "./Visualizer";




// TreeNodeComponent
const TreeNodeComponent = ({
  node,
  visitedIds,
}: {
  node: TreeNode;
  visitedIds: Set<string>;
}) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      <div
        style={{
          display: 'inline-block',
          padding: '4px 8px',
          margin: '4px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: visitedIds.has(node.id) ? 'orange' : 'white',
          color: visitedIds.has(node.id) ? 'white' : 'black',
          transition: 'background 0.3s',
        }}
      >
        {node.label}
      </div>
      <div>
        {(node.children || []).map((child:any) => (
          <TreeNodeComponent
            key={child.id}
            node={child}
            visitedIds={visitedIds}
          />
        ))}
      </div>
    </div>
  );
};


export default TreeNodeComponent