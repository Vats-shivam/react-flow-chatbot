import React from 'react';
import { BaseEdge, getStraightPath } from '@xyflow/react';

interface CustomEdgeProps {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  markerEnd?: string; // Optional arrow marker
  onDelete: () => void; // Function to handle delete action
}

export const CustomEdge: React.FC<CustomEdgeProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  onDelete,
}) => {
  // Get the path for the edge
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  // Calculate the midpoint for the delete button
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  return (
    <>
      {/* Draw the edge */}
      <path
        d={edgePath}
        fill="none"
        stroke="#888" // Change color as needed
        strokeWidth={2}
        markerEnd={markerEnd ? `url(#${markerEnd})` : undefined}
      />
      
      {/* Delete button positioned at the midpoint of the edge */}
      <foreignObject x={midX - 20} y={midY - 20} width={40} height={40}>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white rounded-full p-1"
          style={{ cursor: 'pointer', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          X
        </button>
      </foreignObject>
    </>
  );
};
