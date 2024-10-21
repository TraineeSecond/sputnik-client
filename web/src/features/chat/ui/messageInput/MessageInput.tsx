import { useEffect, useRef, useState } from 'react';

import { SendOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import {
  StyledInputContainer,
  StyledSendButton,
  StyledTextArea,
} from './MessageInput.styles';

const TEXT_AREA_SIZE = { minRows: 1, maxRows: 6 };

interface MessageInputProps {
  handleSendMessage: (messageText: string) => void;
}

function MessageInput({ handleSendMessage }: MessageInputProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      handleSendMessage(trimmedMessage);
      setMessage('');
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isSendDisabled = !message.trim();

  return (
    <StyledInputContainer>
      <StyledTextArea
        ref={textareaRef}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoSize={TEXT_AREA_SIZE}
        placeholder={t('Введите сообщение...')}
      />
      <StyledSendButton
        onClick={sendMessage}
        disabled={isSendDisabled}
        icon={<SendOutlined />}
      >
        {t('Отправить')}
      </StyledSendButton>
    </StyledInputContainer>
  );
}

export default MessageInput;
