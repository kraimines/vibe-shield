import { useState } from 'react';
import type { PropagationNode } from '@/types';

const typeColors: Record<string, string> = {
  client: '#00D4FF',
  project: '#00D4FF',
  employee: '#00FF9F',
  department: '#FF9F00',
  finance: '#FF4757',
};

export default function PropagationMap({ nodes }: { nodes: PropagationNode[] }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div className="relative h-[320px] w-full overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 800 450" className="select-none">
        {nodes.map(node =>
          node.connections.map(targetId => {
            const target = nodeMap[targetId];
            if (!target) return null;
            return (
              <line
                key={`${node.id}-${targetId}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke={node.impacted ? 'hsla(355, 100%, 64%, 0.3)' : 'hsla(220, 30%, 30%, 0.4)'}
                strokeWidth="1.5"
                strokeDasharray={node.impacted ? '6 3' : '0'}
              >
                {node.impacted && (
                  <animate attributeName="stroke-dashoffset" values="9;0" dur="1s" repeatCount="indefinite" />
                )}
              </line>
            );
          })
        )}
        {nodes.map(node => {
          const color = typeColors[node.type];
          const isHovered = hoveredNode === node.id;
          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              {node.impacted && (
                <circle cx={node.x} cy={node.y} r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
                  <animate attributeName="r" values="16;22;16" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? 14 : 12}
                fill={node.impacted ? color : 'hsl(220, 30%, 20%)'}
                stroke={color}
                strokeWidth="1.5"
                opacity={node.impacted ? 0.9 : 0.5}
                className="transition-all duration-200"
              />
              <text
                x={node.x}
                y={node.y + 26}
                textAnchor="middle"
                fill="hsl(220, 15%, 55%)"
                fontSize="9"
                fontFamily="DM Sans"
              >
                {node.label}
              </text>
              {isHovered && (
                <foreignObject x={node.x + 16} y={node.y - 30} width="120" height="50">
                  <div className="bg-card border border-border rounded-lg p-2 text-[10px] text-foreground shadow-lg">
                    <p className="font-medium">{node.label}</p>
                    <p className="text-muted-foreground capitalize">{node.type} · {node.impacted ? '⚠ Impacté' : '✓ Stable'}</p>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
