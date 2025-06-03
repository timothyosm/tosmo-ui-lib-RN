import { lightColors as colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { ExclamationCircleIcon } from "react-native-heroicons/solid";

export type InputProps = {
  label?: string;
  helpText?: string;
  error?: string;
  disabled?: boolean;
  hiddenLabel?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: object;
  inputStyle?: object;
} & TextInputProps;

const Input: React.FC<InputProps> = ({
  label,
  helpText,
  error,
  disabled,
  hiddenLabel,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  ...props
}) => {
  const showError = !!error;
  return (
    <View style={[styles.container, containerStyle]}>
      {!!label && !hiddenLabel && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
      <View style={styles.inputWrapper}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? { paddingLeft: 40 } : undefined,
            rightIcon ? { paddingRight: 40 } : undefined,
            showError && styles.inputError,
            disabled && styles.inputDisabled,
            inputStyle,
          ]}
          placeholderTextColor={
            showError ? colors.placeholderError : colors.placeholder
          }
          editable={!disabled}
          accessibilityLabel={hiddenLabel ? label : undefined}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        {showError && !rightIcon && (
          <View style={styles.rightIcon}>
            <ExclamationCircleIcon color={colors.danger} size={20} />
          </View>
        )}
      </View>
      {!!helpText && !showError && (
        <Text style={styles.helpText}>{helpText}</Text>
      )}
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  labelDisabled: {
    color: colors.textMuted,
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    position: "absolute",
    left: 8,
    zIndex: 1,
  },
  rightIcon: {
    position: "absolute",
    right: 8,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceBackground,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  inputError: {
    borderColor: colors.danger,
    color: colors.textDanger,
  },
  inputDisabled: {
    backgroundColor: colors.surfaceSubtle,
    color: colors.textMuted,
    borderColor: colors.borderDefault,
  },
  helpText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 4,
  },
});

export default Input;
