import { lightColors as colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import React, { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { CheckIcon, XCircleIcon } from "react-native-heroicons/outline";

export type ToastStatus = "success" | "error";

interface ToastProps {
  show: boolean;
  status?: ToastStatus;
  title: string;
  description?: string;
  onClose: () => void;
}

const statusConfig = {
  success: {
    icon: <CheckIcon size={24} color={colors.success} />, // green
  },
  error: {
    icon: <XCircleIcon size={24} color={colors.danger} />, // red
  },
};

const Toast: React.FC<ToastProps> = ({
  show,
  status = "success",
  title,
  description,
  onClose,
}) => {
  const [opacity] = useState(new Animated.Value(show ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: show ? 1 : 0,
      duration: show ? 300 : 100,
      useNativeDriver: true,
    }).start();
  }, [show]);

  if (!show) return null;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.container,
        { opacity, transform: [{ translateY: show ? 0 : 16 }] },
      ]}
      accessibilityLiveRegion="assertive"
    >
      <View style={styles.toastPanel}>
        <View style={styles.iconWrapper}>{statusConfig[status].icon}</View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          {!!description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
        <Pressable
          accessibilityLabel="Close"
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeIcon}>×</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 32,
    alignItems: "center",
    zIndex: 1000,
    pointerEvents: "box-none",
  },
  toastPanel: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.surfaceBackground,
    borderRadius: radii.lg,
    padding: 16,
    minWidth: 280,
    maxWidth: 360,
  },
  iconWrapper: {
    marginTop: 2,
  },
  textWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceBackground,
    alignSelf: "flex-start",
  },
  closeIcon: {
    fontSize: 20,
    color: colors.textMuted,
    fontWeight: "bold",
    lineHeight: 20,
  },
});

export default Toast;
