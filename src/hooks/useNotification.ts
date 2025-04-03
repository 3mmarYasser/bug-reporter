import { useState, useCallback } from 'react';
import { NOTIFICATION_DURATION } from '../constants';

export const useNotification = () => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const showNotification = useCallback((msg: string) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), NOTIFICATION_DURATION);
  }, []);

  const hideNotification = useCallback(() => {
    setShowMessage(false);
  }, []);

  return {
    message,
    showMessage,
    showNotification,
    hideNotification,
  };
}; 