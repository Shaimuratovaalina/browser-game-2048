import styled, { keyframes } from 'styled-components';

// Анимация появления
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledScoreBoard = styled.div<{ $isBest?: boolean }>`
  background: linear-gradient(135deg,  #7884EC, #3B0788););
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin: 4px;
  animation: ${fadeInUp} 0.3s ease-out forwards;

  & + & {
    margin-left: 10px;
  }

  ${({ $isBest }) =>
    $isBest &&
    `
      background: linear-gradient(135deg, #1A1A1A,#F5F7FF);
    `}
`;