import React from 'react';
import Text from '../Text';
import { StyledScoreBoard } from './StyledScoreBoard';

export interface ScoreBoardProps {
  title: string;
  total: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ total, title }) => {
   return (
  <StyledScoreBoard $isBest={title === 'Лучший счёт'}>
    <Text fontSize={14} fontWeight="bold" color="white"> {title} </Text>
    <Text fontSize={14} fontWeight="bold" color="white"> {total} </Text>
    </StyledScoreBoard>
    );
};

export default ScoreBoard;