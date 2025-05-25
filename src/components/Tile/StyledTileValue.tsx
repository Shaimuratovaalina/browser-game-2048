// src/components/Tile/StyledTileValue.tsx
import styled from 'styled-components';
import { expand, pop } from '../../utils/animation';
import { getTileColor } from '../../utils/common';

export interface StyledTileValueProps {
  value: number;
  isNew?: boolean;
  isMerging?: boolean;
}

const StyledTileValue = styled.div<StyledTileValueProps>`
  width: 100%;
  height: 100%;
  font-size: inherit;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme, value }) => theme.palette[getTileColor(value)]};
  animation-name: ${props =>
    props.isMerging ? pop : props.isNew ? expand : ''};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  
  color: ${({ theme, value }) =>
    value === 2 ? '#776e65' : 'white'};
  user-select: none;

  font-size: clamp(12px, 4vw, 24px); /* Шрифт масштабируется */
`;

export default StyledTileValue;