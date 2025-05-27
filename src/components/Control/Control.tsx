import React, { FC } from 'react';
import { StyledGradientButton } from '../../components/StyledGradientButton';
import { MAX_SCALE, MIN_SCALE } from '../../utils/constants';
import Box from '../Box';

import Text from '../Text';

export interface ControlProps {
  rows: number;
  cols: number;
  onReset: () => void;
  onChangeRow: (newRow: number) => void;
  onChangeCol: (newCol: number) => void;
}

const Control: FC<ControlProps> = ({
  rows,
  cols,
  onReset,
  onChangeRow,
  onChangeCol,
}) => (
  <Box inlineSize="90%" justifyContent="space-between">
    {/* Кнопка "Новая игра" */}
    <StyledGradientButton onClick={onReset}>
      <Text fontSize={14} textTransform="capitalize">Новая игра</Text> </StyledGradientButton>

    <Box>
      {/* Строчки */}
      <Box marginInlineEnd="s6" flexDirection="column">
        <Text textTransform="uppercase" fontSize={13} color="primary">
          Строки
        </Text>
        <Box padding="s2">
          <StyledGradientButton 
            onClick={() => onChangeRow(-1)} 
            disabled={rows === MIN_SCALE} > - </StyledGradientButton>
          <Box marginInline="s2">
            <Text fontSize={14} color="primary">{rows}</Text>
          </Box>
          <StyledGradientButton onClick={() => onChangeRow(1)} disabled={rows === MAX_SCALE} > + </StyledGradientButton> </Box> 
      </Box>

      {/* Столбцы */}
      <Box flexDirection="column">
        <Text textTransform="uppercase" fontSize={13} color="primary">
          Столбцы
        </Text>
        <Box padding="s2">
          <StyledGradientButton onClick={() => onChangeCol(-1)} disabled={cols === MIN_SCALE} > - </StyledGradientButton>
          <Box marginInline="s2">
            <Text fontSize={14} color="primary">{cols}</Text>
          </Box>
          <StyledGradientButton onClick={() => onChangeCol(1)} disabled={cols === MAX_SCALE} > + </StyledGradientButton>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default React.memo(Control);