// src/components/Tile/Tile.tsx
import React from 'react';
import StyledTile from './StyledTile';
import StyledTileValue from './StyledTileValue';

export interface TileProps {
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isNew?: boolean;
  isMerging?: boolean;
}

const Tile: React.FC<TileProps> = ({
  value,
  x,
  y,
  width,
  height,
  isNew = false,
  isMerging = false,
}) => (
  <StyledTile
    value={value}
    x={x}
    y={y}
    width={width}
    height={height}
    style={{
      '--tileMoveX': `${x}px`,
      '--tileMoveY': `${y}px`,
    }}
  >
    <StyledTileValue
      value={value}
      isNew={isNew}
      isMerging={isMerging}
    >
      {value}
    </StyledTileValue>
  </StyledTile>
);

export default Tile;