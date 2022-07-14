import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Button, ButtonProps } from '../Button';
import styles from './styles';
import { useHeaderHeight } from '@react-navigation/elements';

interface NextButtonProps {
  disabled?: ButtonProps['disabled'];
  onSubmit: ButtonProps['onPress'];
  loading?: ButtonProps['loading'];
  useKeyboardAvoidingView?: boolean;
}

export default ({
  disabled,
  onSubmit,
  loading,
  useKeyboardAvoidingView = true,
}: NextButtonProps) => {
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      enabled={useKeyboardAvoidingView}
      keyboardVerticalOffset={30 + headerHeight}
      behavior={'padding'}
      style={styles.button}>
      <Button
        size="block"
        title="Next"
        disabled={disabled}
        onPress={onSubmit}
        loading={loading}
      />
    </KeyboardAvoidingView>
  );
};
