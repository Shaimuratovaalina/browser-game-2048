import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

// Компоненты
import AboutModal from './components/AboutModal';
import Box from './components/Box';

import Control from './components/Control/Control';
import GameBoard from './components/GameBoard';
import GameOverModal from './components/GameOverModal';
import Hint from './components/Hint'; // если App.tsx в src/
import HowToPlayModal from './components/HowToPlayModal/HowToPlayModal';
import ScoreBoard from './components/ScoreBoard';
import SettingsModal from './components/SettingsModal/SettingsModal';
import Text from './components/Text';
import Timer from './components/Timer/Timer';
import TimeStatsModal from './components/TimeStatsModal/TimeStatsModal';
import VictoryModal from './components/VictoryModal';

// Хуки
import useGameBoard from './hooks/useGameBoard';
import useGameScore from './hooks/useGameScore';
import useGameState, { GameStatus } from './hooks/useGameState';
import useLocalStorage from './hooks/useLocalStorage';
import useScaleControl from './hooks/useScaleControl';
import useTheme from './hooks/useTheme';

// Утилиты
import { Theme, ThemeName } from './themes/types';
import { GRID_SIZE, SPACING } from './utils/constants';
import { canGameContinue } from './utils/rules';

// Типы
import { Vector } from './utils/types';

// Темы
import cosmicTheme from './themes/cosmic';
import darkTheme from './themes/dark';
import defaultTheme from './themes/default';
import forestTheme from './themes/forest';
import halloweenTheme from './themes/halloween';
import neonTheme from './themes/neon';
import pixelTheme from './themes/pixel';
import retroTheme from './themes/retro';

// Анимации и стили
import styled from 'styled-components';
import { StyledGradientButton } from './components/StyledGradientButton';

export type Configuration = {
  theme: ThemeName;
  bestScore: number;
  rows: number;
  cols: number;
};

const APP_NAME = 'react-2048';
//******************************************************************************
// === Стиль для контейнера ===
const Container = styled(Box)`
  padding: 20px;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;
// === Стиль заголовка ===
const Title = styled(Text)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Satisfy', cursive;
  color: #2c3e50;
`;


// === Контейнер для счетчиков ===
const ScoresContainer = styled(Box)`
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
// === Контейнер для кнопок управления ===
const Controls = styled(Box)`
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  gap: 10px;
`;

//***********************************************************************

const themes: Record<ThemeName, Theme> = {
  default: defaultTheme,
  dark: darkTheme,
  retro: retroTheme,
  halloween: halloweenTheme,
  forest: forestTheme,
  neon: neonTheme,
  cosmic: cosmicTheme,
  pixel: pixelTheme,
};

// === Основной компонент ===

const App: React.FC = () => {
  const [gameState, setGameStatus] = useGameState({status: 'running', pause: false, });
  const [config, setConfig] = useLocalStorage<Configuration>(APP_NAME, {
    theme: 'default',
    bestScore: 0,
    rows: 4,
    cols: 4,
  });
  
  const [{ name: themeName }, setTheme] = useTheme(config.theme);
  const [rows, setRows] = useScaleControl(config.rows);
  const [cols, setCols] = useScaleControl(config.cols);

  const { total, best, addScore, setTotal } = useGameScore(config.bestScore);

  const { tiles, grid, onMove, onMovePending, onMergePending } = useGameBoard({
    rows,
    cols,
    gameState,
    addScore,
  });
  
  const [moves, setMoves] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true); // Активность таймера
  const [time, setTime] = useState(0); // Время текущей игры
  const hints = ['Собирайте плитки в углу', 'Избегайте хаотичных ходов'];
  /*const hints = [
  'Собирайте плитки в углу',
  'Избегайте хаотичных ходов',
  'Стремитесь объединять большие числа',
];*/


const [hintIndex, setHintIndex] = useState(0);


useEffect(() => {
  const interval = setInterval(() => {
    setHintIndex((prev) => (prev + 1) % hints.length);
  }, 10000);
  return () => clearInterval(interval);
}, []);
const [totalTimeSaved, setTotalTimeSaved] = useState<number | null>(null); // Сохра-нённое время после завершения
const [showTimeStats, setShowTimeStats] = useState(false); // Статистика по времени
const handleMove = (dir: Vector) => {
  setMoves(prev => prev + 1);
  onMove(dir);
};
const onResetGame = useCallback(() => {
  setGameStatus('restart');
  setIsTimerActive(false);
  setTimeout(() => setIsTimerActive(true), 100);
}, [setGameStatus]);
const onCloseNotification = useCallback(
  (currentStatus: GameStatus) => {
    setGameStatus(currentStatus === 'win' ? 'continue' : 'restart');
  },
  [setGameStatus],
);
const [showAbout, setShowAbout] = useState(false);
const [showHowToPlay, setShowHowToPlay] = useState(false);
const [hasPlayedBefore, setHasPlayedBefore] = useLocalStorage('hasPlayedBefore', false);
const [showSettings, setShowSettings] = useState(false);
const [showVictory, setShowVictory] = useState(false);
const [showGameOver, setShowGameOver] = useState(false);
useEffect(() => {if (!hasPlayedBefore) { setShowHowToPlay(true); } }, [hasPlayedBefore]);
const handleCloseHowToPlay = () => { setShowHowToPlay(false); setHasPlayedBefore(true); };

if (gameState.status === 'restart') { setTotal(0); setMoves(0); setTime(0); setTotalTimeSaved(null); setGameStatus('running'); setIsTimerActive(true);}
useEffect(() => {let interval: number; if (isTimerActive) { interval = window.setInterval(() => { setTime(prev => prev + 1); }, 1000);}
return () => clearInterval(interval);
}, [isTimerActive]);

useEffect(() => {if (gameState.status === 'lost' || gameState.status === 'win') { setIsTimerActive(false); setTotalTimeSaved(time); } }, [gameState.status, time]);

  // Открытие модального окна "Победа" или "Проигрыш"
  useEffect(() => { if (gameState.status === 'lost') { setShowGameOver(true); setShowVictory(false); }

    if (gameState.status === 'win') {setShowVictory(true); setShowGameOver(false); } }, [gameState.status]);

  // Проверка, можно ли продолжать игру
  useEffect(() => {
    if (!canGameContinue(grid, tiles)) {
      setGameStatus('lost');
    }
  }, [grid, tiles]);

  // Сохранение конфигурации темы и размеров
  useEffect(() => {
    setGameStatus('restart');
  }, [rows, cols, setGameStatus]);

  useEffect(() => {
    setConfig({ rows, cols, bestScore: best, theme: themeName });
  }, [rows, cols, best, themeName, setConfig]);

  return (
    <ThemeProvider theme={themes[themeName]}>
      <Container>
        <Title>2048</Title>

        {/* Левая панель */}
        <Box flexDirection="column" marginInlineEnd="s6" style={{ minWidth: '180px' }}>
          <StyledGradientButton onClick={() => setShowAbout(true)}>
            <Text fontSize={16} textTransform="capitalize">Об авторе</Text>
          </StyledGradientButton>
          <Box marginBlockStart="s5" />
          <StyledGradientButton onClick={() => { setShowHowToPlay(true); setHasPlayedBefore(false); }}>
            <Text fontSize={16} textTransform="capitalize">Как играть</Text>
          </StyledGradientButton>
          <Box marginBlockStart="s3" />
        </Box>

        {/* Центральная часть - сама игра */}
        <Box justifyContent="center" inlineSize={`${GRID_SIZE}px`} flexDirection="column">
          {/* Заголовок и счётчики */}
          

          {/* Таймер */}
          <Box marginBlockStart="s2" alignItems="center">
            <Timer isActive={isTimerActive} time={time} />
          </Box>

          {/* Счетчики */}
          <ScoresContainer>
            <ScoreBoard total={total} title="Текущий счёт" />
            <ScoreBoard total={best} title="Лучший счёт" />
            <ScoreBoard total={moves} title="Ходы" />
          </ScoresContainer>

          {/* Панель управления размерами поля */}
          <Box marginBlockStart="s2" marginBlockEnd="s6" inlineSize="100%">
            <Control rows={rows} cols={cols} onReset={onResetGame} onChangeRow={setRows} onChangeCol={setCols} />
          </Box>

          {/* Игровое поле */}
          <Box justifyContent="center" flexDirection="column" inlineSize={`${GRID_SIZE}px`} position="relative">
            <GameBoard
              tiles={tiles}
              boardSize={GRID_SIZE}
              rows={rows}
              cols={cols}
              spacing={SPACING}
              gameStatus={gameState.status}
              onMove={handleMove}
              onMovePending={onMovePending}
              onMergePending={onMergePending}
              onCloseNotification={onCloseNotification}
            />

            {/* Подсказка над игровым полем */}
            <Hint message={hints[hintIndex]} />
          </Box>

          {/* Подсказка */}
          <Box marginBlock="s4" justifyContent="center" flexDirection="column">
                       
          </Box>
        </Box>

        {/* Правая панель - настройки */}
        <Box flexDirection="column" marginInlineStart="s6" justifyContent="start" style={{ minWidth: '120px' }}>
          <StyledGradientButton onClick={() => setShowSettings(true)}>
            <Text fontSize={16} textTransform="capitalize">Сменить тему</Text>
          </StyledGradientButton>
          <Box marginBlockStart="s3" />
          <StyledGradientButton onClick={() => { if (totalTimeSaved !== null && totalTimeSaved > 0) { setShowTimeStats(true); } }}>
            <Text fontSize={16} textTransform="capitalize">Статистика по времени</Text>
          </StyledGradientButton>
        </Box>
      </Container>

      {/* Модальные окна */}
      {showAbout && <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />}
      {showHowToPlay && <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} />}
      {showSettings && <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} themeName={themeName} setTheme={setTheme} />}
      {showTimeStats && <TimeStatsModal isOpen={showTimeStats} onClose={() => setShowTimeStats(false)} totalTime={totalTimeSaved ?? 0} />}
      {showVictory && <VictoryModal isOpen={showVictory} onClose={() => { setShowVictory(false); setGameStatus('continue'); }} />}
      {showGameOver && <GameOverModal isOpen={showGameOver} onClose={() => { setShowGameOver(false); setGameStatus('restart'); }} />}
    </ThemeProvider>
  );
}
export default App;
