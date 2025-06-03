import Sidebar, {
  SidebarNavItem,
  SidebarTeam,
} from "@/components/organisms/Sidebar";
import { useSidebarStore } from "@/store/sidebar";
import { lightColors as colors } from "@/theme/colors";
import type { ReactNode } from "react";
import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Bars3Icon, BellIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export interface NavbarProps {
  navigation: SidebarNavItem[];
  teams?: SidebarTeam[];
  profile?: {
    name: string;
    avatarUrl: string;
    onPress?: () => void;
    email?: string;
  };
  onNotificationPress?: () => void;
  notificationCount?: number; // Add this prop
  style?: ViewStyle;
  children?: ReactNode;
}

/**
 * Navbar organism for displaying a sidebar and top navigation bar.
 *
 * @remarks
 * This component provides a responsive navigation layout with a sidebar (drawer) and a top bar. It supports team navigation, user profile, and notification actions. The sidebar can be toggled open/closed using the hamburger button. The notification bell and profile avatar are conditionally rendered based on props.
 *
 * @example
 * ```tsx
 * <Navbar
 *   navigation={navItems}
 *   teams={teams}
 *   profile={{ name: 'Jane', avatarUrl: '...', onPress: () => {} }}
 *   onNotificationPress={() => {}}
 *   notificationCount={3}
 * >
 *   <MainContent />
 * </Navbar>
 * ```
 *
 * @param navigation - Array of sidebar navigation items. Each item should have a name, icon, and optional count/current/onPress.
 * @param teams - Optional array of team objects for the sidebar. Each team should have id, name, initial, and optional onPress/current.
 * @param profile - Optional user profile object. If provided, shows avatar and name in the top bar. Accepts `name`, `avatarUrl`, optional `onPress` and `email`.
 * @param onNotificationPress - Optional callback invoked when the notification bell is pressed. Only shown if `notificationCount` is a positive number.
 * @param notificationCount - Optional number of notifications. If > 0, the bell icon and dot are shown.
 * @param style - Optional style for the root SafeAreaView container.
 * @param children - React children to render as the main content area.
 *
 * @returns The composed navigation layout with sidebar, top bar, and content area.
 */

const SCREEN_WIDTH = Dimensions.get("window").width;

const Navbar: React.FC<NavbarProps> = ({
  navigation,
  teams = [],
  profile,
  onNotificationPress,
  notificationCount,
  style,
  children,
}) => {
  const { open, openSidebar, closeSidebar, toggleSidebar } = useSidebarStore();
  const sidebarAnim = React.useRef(
    new Animated.Value(-SCREEN_WIDTH * 0.8)
  ).current;

  React.useEffect(() => {
    Animated.timing(sidebarAnim, {
      toValue: open ? 0 : -SCREEN_WIDTH * 0.8,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [open]);

  return (
    <SafeAreaView
      style={[styles.safeArea, style]}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.navbar}>
        {open && (
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}
        <Animated.View
          style={[
            styles.animatedSidebar,
            { transform: [{ translateX: sidebarAnim }] },
          ]}
          pointerEvents={open ? "auto" : "none"}
        >
          <Sidebar
            navigation={navigation}
            teams={teams}
            profile={profile}
            style={{ maxWidth: 280, minWidth: 220, height: "100%" }}
          />
        </Animated.View>
        <View style={styles.right}>
          <View style={styles.topBar}>
            <Pressable
              onPress={toggleSidebar}
              style={({ pressed }) => [
                styles.hamburgerBtn,
                pressed && { opacity: 0.7 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Open sidebar menu"
            >
              <Bars3Icon color={colors.brandPrimary} size={28} />
            </Pressable>
            <View style={styles.logoWrap}>
              <Image
                source={{
                  uri: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600",
                }}
                style={styles.logo}
                accessibilityLabel="Your Company"
              />
              <Text style={styles.companyName}>Your Company</Text>
            </View>
            {typeof notificationCount === "number" &&
              notificationCount > 0 &&
              onNotificationPress && (
                <Pressable
                  onPress={onNotificationPress}
                  style={({ pressed }) => [
                    styles.bellBtn,
                    pressed && { opacity: 0.7 },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="View notifications"
                >
                  <BellIcon color={colors.brandPrimary} size={24} />
                  {notificationCount > 0 && (
                    <View style={styles.notificationDot} />
                  )}
                </Pressable>
              )}
            {profile && (
              <Pressable
                onPress={profile.onPress}
                style={({ pressed }) => [
                  styles.profileBtn,
                  pressed && { opacity: 0.7 },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Open user menu"
              >
                <Image
                  source={{ uri: profile.avatarUrl }}
                  style={styles.profileAvatar}
                />
              </Pressable>
            )}
          </View>
          <View style={styles.content}>
            <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
              {children}
            </SafeAreaView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: colors.surfaceBackground,
    flex: 1,
  },
  animatedSidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.8,
    zIndex: 20,
    backgroundColor: colors.brandPrimary,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: 10,
  },
  right: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.surfaceBackground,
    zIndex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 64,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderDefault,
    backgroundColor: colors.surfaceBackground,
  },
  hamburgerBtn: {
    marginRight: 16,
    padding: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceSubtle,
  },
  logoWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    height: 32,
    width: 32,
    resizeMode: "contain",
    marginRight: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.brandPrimary,
  },
  bellBtn: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceSubtle,
  },
  profileBtn: {
    marginLeft: 16,
    padding: 2,
    borderRadius: 999,
    backgroundColor: colors.surfaceBackground,
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brandPrimaryActive,
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.surfaceMuted,
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
    zIndex: 2,
  },
});

export default Navbar;
