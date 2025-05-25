import styled, { keyframes } from 'styled-components';

const flashAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.6);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

export const StyledGradientButton = styled.button`
  background: linear-gradient(135deg,rgb(120, 132, 236),rgb(59, 7, 136));
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    animation: ${flashAnimation} 0.5s forwards;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;