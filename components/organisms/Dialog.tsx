import { useDialogStore } from "@/store/dialog";
import { lightColors as colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";

/**
 * Dialog organism for modal dialogs with actions and status.
 *
 * @remarks
 * Uses Zustand dialog store for state. Supports primary/secondary actions and status icons.
 *
 * @example
 * ```tsx
 * <Dialog visible title="Confirm" primaryActionLabel="OK" />
 * ```
 *
 * @returns A modal dialog component.
 */

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
    icon: <CheckIcon size={32} color={colors.success} />,
    bg: colors.successBg,
  },
  error: {
    icon: <XCircleIcon size={32} color={colors.danger} />,
    bg: colors.dangerBg,
  },
  warning: {
    icon: <ExclamationTriangleIcon size={32} color={colors.warning} />,
    bg: colors.warningBg,
  },
};

const Dialog: React.FC<Partial<DialogProps>> = (props) => {
  const {
    visible,
    status,
    title,
    description,
    primaryActionLabel,
    onPrimaryAction,
    secondaryActionLabel,
    onSecondaryAction,
    hideDialog,
  } = useDialogStore();

  if (!visible) return null;

  const { icon, bg } = statusConfig[status || "success"];
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={hideDialog}
    >
      <View style={styles.backdrop}>
        <View style={styles.panel}>
          <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
            {" "}
            {icon}{" "}
          </View>
          <Text style={styles.title}>{title}</Text>
          {!!description && (
            <Text style={styles.description}>{description}</Text>
          )}
          <View style={styles.actions}>
            {secondaryActionLabel && (
              <Pressable
                style={[styles.button, styles.secondaryButton]}
                onPress={onSecondaryAction || hideDialog}
              >
                <Text style={styles.secondaryButtonText}>
                  {secondaryActionLabel}
                </Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.button, styles.primaryButton]}
              onPress={onPrimaryAction || hideDialog}
            >
              <Text style={styles.primaryButtonText}>
                {primaryActionLabel || "OK"}
              </Text>
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
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  panel: {
    backgroundColor: colors.surfaceBackground,
    borderRadius: radii.xl,
    padding: 24,
    width: "85%",
    alignItems: "center",
  },
  iconWrapper: {
    borderRadius: radii.full,
    padding: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
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
    backgroundColor: colors.brandPrimary,
  },
  primaryButtonText: {
    color: colors.textInverse,
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: colors.surfaceBackground,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    marginRight: 8,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Dialog;
