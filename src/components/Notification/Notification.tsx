import { FC } from 'react';
import Box from '../Box';
import Button from '../Button';
import Text from '../Text';
import StyledBackdrop from './StyledBackdrop';
import StyledModal from './StyledModal';

export interface NotificationProps {
  win: boolean;
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ win, onClose }) => (
  <StyledModal>
    <StyledBackdrop />
    <Box paddingBlock="s5" background="transparent">
      <Text fontSize={22} color="primary">
        {win ? 'You win! Continue?' : 'Oops...Game Over!'}
      </Text>
    </Box>
    <Button onClick={onClose}>{win ? 'Continue' : 'Retry'}</Button>
  </StyledModal>
);

export default Notification;
