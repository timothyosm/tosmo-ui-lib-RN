import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";

interface DialogProps {
  visible: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  status?: "success" | "error" | "warning";
}

const statusConfig = {
  success: {
    icon: <CheckIcon size={32} color="#22c55e" />,
    bg: "#bbf7d0",
  },
  error: {
    icon: <XCircleIcon size={32} color="#ef4444" />,
    bg: "#fecaca",
  },
  warning: {
    icon: <ExclamationTriangleIcon size={32} color="#facc15" />,
    bg: "#fef08a",
  },
};

const Dialog: React.FC<DialogProps> = ({
  visible,
  title,
  description,
  onClose,
  primaryActionLabel = "OK",
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  status = "success",
}) => {
  const { icon, bg } = statusConfig[status];
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.panel}>
          <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
            {icon}
          </View>
          <Text style={styles.title}>{title}</Text>
          {!!description && (
            <Text style={styles.description}>{description}</Text>
          )}
          <View style={styles.actions}>
            {secondaryActionLabel && (
              <Pressable
                style={[styles.button, styles.secondaryButton]}
                onPress={onSecondaryAction || onClose}
              >
                <Text style={styles.secondaryButtonText}>
                  {secondaryActionLabel}
                </Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.button, styles.primaryButton]}
              onPress={onPrimaryAction || onClose}
            >
              <Text style={styles.primaryButtonText}>{primaryActionLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(55, 65, 81, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  panel: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconWrapper: {
    borderRadius: 999,
    padding: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#4f46e5",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginRight: 8,
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Dialog;
