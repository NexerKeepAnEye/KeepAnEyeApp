import * as React from 'react';
import { View } from 'react-native';
import {
  Button,
  Dialog,
  PaperProvider,
  Portal,
  Text,
} from 'react-native-paper';
import { alertDialogStyles } from '../Style/AlertDialogStyle';

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
  onConfirmText?: string;
  children?: React.ReactNode;
  onCancel?: () => void;
  onCancelText?: string;
}

const AlertDialog = ({
  visible,
  title,
  message,
  onConfirm,
  children,
  onCancel,
  onConfirmText,
  onCancelText,
}: AlertDialogProps) => {
  return (
    <PaperProvider>
      <View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={onConfirm}
            style={[alertDialogStyles.dialog]}
          >
            <Dialog.Title style={alertDialogStyles.title}>{title}</Dialog.Title>
            <Dialog.Content>
              <Text
                variant="bodyMedium"
                style={alertDialogStyles.message}
              >
                {message}
              </Text>
              {children}
            </Dialog.Content>
            <Dialog.Actions style={alertDialogStyles.buttonContainer}>
              {onCancel && (
                <Button
                  style={alertDialogStyles.button}
                  onPress={onCancel}
                >
                  <Text style={alertDialogStyles.cancelText}>
                    {onCancelText}
                  </Text>
                </Button>
              )}
              <Button
                style={alertDialogStyles.button}
                onPress={onConfirm}
              >
                <Text style={alertDialogStyles.confirmText}>
                  {onConfirmText}
                </Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default AlertDialog;
