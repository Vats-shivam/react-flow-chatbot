import React, { useCallback, useEffect } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  useNodesState, 
  addEdge, 
  useEdgesState, 
  applyNodeChanges, 
  applyEdgeChanges, 
  Node, 
  Edge,
  Panel,
  Connection,
  NodeTypes, 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Scene from './Scene';
import { useSidebarContext } from '../context/SidebarContext';

const initialNodes: Node[] = [
  { id: '1', type: 'textUpdater', data: { value: 123 }, position: { x: 250, y: 0 } },
];

const nodeTypes: NodeTypes = { textUpdater: Scene, };

const initialEdges: Edge[] = [];

const FlowDiagram: React.FC = () => {
  const storedNodes = localStorage.getItem('nodes');
  const storedEdges = localStorage.getItem('edges');
  const [nodes, setNodes] = useNodesState<Node>(storedNodes ? JSON.parse(storedNodes) : initialNodes);
  const [edges, setEdges] = useEdgesState<Edge>(storedEdges?JSON.parse(storedEdges):initialEdges);
  const { toggleForm } = useSidebarContext();

  const handleNodeChanges = useCallback(
    (changes: any[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds))
      localStorage.setItem('nodes', JSON.stringify(nodes));
    },
    [setNodes],
  );

  const handleEdgeChanges = useCallback(
    (changes: any[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges, edges],
  );

  useEffect(()=>{
    console.log(edges)
    localStorage.setItem('edges', JSON.stringify(edges));
  },[edges])

  const addNode = () => {
    const newNode = {
      id: `node_${nodes.length + 1}`, // Unique ID for the new node
      type: 'textUpdater', // Type of the node
      position: { x: Math.random() * 100, y: Math.random() * 200 }, // Random position
      data: { label: `Node ${nodes.length + 1}` }, // Data for the node
    };
    setNodes((nds) => {
      localStorage.setItem('nodes', JSON.stringify(nds.concat(newNode)));
      return nds.concat(newNode);
    });
  };

  const handleFlowClick = (event: React.MouseEvent) => {
    // Prevents function from running if the click is on a node or edge
    const target = event.target as HTMLElement;
    if (target.closest('.react-flow__node') || target.closest('.react-flow__edge')) {
      return;
    }
    toggleForm('');
  };

  return (
    <div className='w-full h-full bg-gray-100 text-xs' onClick={handleFlowClick}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodeChanges}
        onEdgesChange={handleEdgeChanges}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#2c2c2c" gap={16} />
        <Controls />
        <Panel style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
          <button 
            onClick={addNode} 
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
          >
            Add A Node
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
