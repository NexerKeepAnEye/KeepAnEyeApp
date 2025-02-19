import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  PaperProvider,
  Portal,
  Text,
} from 'react-native-paper';

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onConfirmText: string;
  children?: React.ReactNode;
  onCancel?: () => void;
  onCancelText?: string;
}

const AlertDialog = ({
  visible,
  title,
  message,
  onConfirm: onConfirm,
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
            style={[styles.dialog]}
          >
            <Dialog.Title style={styles.title}>{title}</Dialog.Title>
            <Dialog.Content>
              <Text
                variant="bodyMedium"
                style={styles.message}
              >
                {message}
              </Text>
              {children}
            </Dialog.Content>
            <Dialog.Actions style={styles.button}>
              {onCancel && (
                <Button
                  style={styles.button}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelText}>{onCancelText}</Text>
                </Button>
              )}
              <Button
                style={styles.button}
                onPress={onConfirm}
              >
                <Text style={styles.confirmText}>{onConfirmText}</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    // padding: 10,
    // borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    maxHeight: '25%',
  },
  title: {
    fontSize: 20,
    fontFamily: 'inter_Bold',
  },
  message: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'inter_Regular',
  },
  button: {
    // marginHorizontal: 10,
    gap: 100,
  },
  confirmText: {
    color: 'blue',
    fontFamily: 'inter_Bold',
    fontSize: 18,
  },
  cancelText: {
    color: 'red',
    fontFamily: 'inter_Bold',
    fontSize: 18,
  },
});

export default AlertDialog;
