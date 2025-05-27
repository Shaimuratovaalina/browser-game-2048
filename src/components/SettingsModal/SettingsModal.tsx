import React from 'react';
import styled from 'styled-components';
import { StyledGradientButton } from '../../components/StyledGradientButton'; // Путь к вашему новому компоненту

// Стиль для фона модального окна
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

// Стиль для содержимого модального окна
const ModalContent = styled.div`
  background-color: white;
  color: black;
  padding: 32px;
  border-radius: 12px;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Satisfy', cursive;
  line-height: 1.6;
  text-align: left;
`;

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeName: string;
  setTheme: (theme: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  themeName,
  setTheme,
}) => {
  if (!isOpen) return null;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '24px' }}>Настройки</h2>

        {/* Выбор темы */}
        <div style={{ marginBottom: '24px' }}>
          <strong>Выберите тему:</strong>
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column' }}>
            <StyledGradientButton 
              style={{ margin: '8px 0', ...(themeName === 'default' ? { boxShadow: 'inset 0 0 0 2px #ec9050' } : {}) }}
              onClick={() => handleThemeChange('default')}
            >
              Светлая тема
            </StyledGradientButton>

            <StyledGradientButton 
              style={{ margin: '8px 0', ...(themeName === 'dark' ? { boxShadow: 'inset 0 0 0 2px #ec9050' } : {}) }}
              onClick={() => handleThemeChange('dark')}
            >
              Темная тема
            </StyledGradientButton>

            <StyledGradientButton 
              style={{ margin: '8px 0', ...(themeName === 'retro' ? { boxShadow: 'inset 0 0 0 2px #ec9050' } : {}) }}
              onClick={() => handleThemeChange('retro')}
            >
              Ретро тема
            </StyledGradientButton>

            <StyledGradientButton 
              style={{ margin: '8px 0', ...(themeName === 'cosmic' ? { boxShadow: 'inset 0 0 0 2px #ec9050' } : {}) }}
              onClick={() => handleThemeChange('cosmic')}
            >
              Космическая тема
            </StyledGradientButton>

            <StyledGradientButton 
              style={{ margin: '8px 0', ...(themeName === 'pixel' ? { boxShadow: 'inset 0 0 0 2px #ec9050' } : {}) }}
              onClick={() => handleThemeChange('pixel')}
            >
              Пиксельная тема
            </StyledGradientButton>

            <StyledGradientButton 
              style={{ margin: '8px 0', ...(themeName === 'halloween' ? { boxShadow: 'inset 0 0 0 2px #ec9050' } : {}) }}
              onClick={() => handleThemeChange('halloween')}
            >
              Хэллоуин
            </StyledGradientButton>

            <StyledGradientButton 
              style={{ margin: '8px 0', ...(themeName === 'forest' ? { boxShadow: 'inset 0 0 0 2px #ec9050' } : {}) }}
              onClick={() => handleThemeChange('forest')}
            >
              Лесная
            </StyledGradientButton>

            <StyledGradientButton 
              style={{ margin: '8px 0', ...(themeName === 'neon' ? { boxShadow: 'inset 0 0 0 2px #ec9050' } : {}) }}
              onClick={() => handleThemeChange('neon')}
            >
              Неоновая
            </StyledGradientButton>
          </div>
        </div>

        <StyledGradientButton onClick={onClose}>Закрыть</StyledGradientButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingsModal;
export type { SettingsModalProps };
