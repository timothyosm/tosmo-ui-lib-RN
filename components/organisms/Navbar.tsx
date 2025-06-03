import Sidebar, {
  SidebarNavItem,
  SidebarTeam,
} from "@/components/organisms/Sidebar";
import type { ReactNode } from "react";
import React, { useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarAnim = React.useRef(
    new Animated.Value(-SCREEN_WIDTH * 0.8)
  ).current;

  React.useEffect(() => {
    Animated.timing(sidebarAnim, {
      toValue: sidebarOpen ? 0 : -SCREEN_WIDTH * 0.8,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [sidebarOpen]);

  return (
    <SafeAreaView
      style={[styles.safeArea, style]}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.navbar}>
        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <TouchableWithoutFeedback onPress={() => setSidebarOpen(false)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}
        <Animated.View
          style={[
            styles.animatedSidebar,
            { transform: [{ translateX: sidebarAnim }] },
          ]}
          pointerEvents={sidebarOpen ? "auto" : "none"}
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
              onPress={() => setSidebarOpen((open) => !open)}
              style={({ pressed }) => [
                styles.hamburgerBtn,
                pressed && { opacity: 0.7 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Open sidebar menu"
            >
              <Bars3Icon color="#4f46e5" size={28} />
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
            {/* Only show notification icon if notificationCount > 0 and onNotificationPress is provided */}
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
                  <BellIcon color="#4f46e5" size={24} />
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
    backgroundColor: "#fff",
    flex: 1,
  },
  animatedSidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.8,
    zIndex: 20,
    backgroundColor: "#4f46e5",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
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
    backgroundColor: "#fff",
    zIndex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 64,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  hamburgerBtn: {
    marginRight: 16,
    padding: 8,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
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
    color: "#4f46e5",
  },
  bellBtn: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
  },
  profileBtn: {
    marginLeft: 16,
    padding: 2,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#6366f1",
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9fafb",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    zIndex: 2,
  },
});

export default Navbar;
