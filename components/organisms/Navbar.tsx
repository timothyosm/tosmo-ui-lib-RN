import Sidebar, {
  SidebarNavItem,
  SidebarTeam,
} from "@/components/organisms/Sidebar";
import type { ReactNode } from "react";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { BellIcon } from "react-native-heroicons/outline";
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
  style?: ViewStyle;
  children?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({
  navigation,
  teams = [],
  profile,
  onNotificationPress,
  style,
  children,
}) => {
  return (
    <SafeAreaView
      style={[styles.safeArea, style]}
      edges={["top", "left", "right", "bottom"]} // Ensure all edges are respected
    >
      <View style={styles.navbar}>
        <View style={styles.left}>
          <Sidebar
            navigation={navigation}
            teams={teams}
            profile={profile}
            style={{ maxWidth: 280, minWidth: 220, height: "100%" }}
          />
        </View>
        <View style={styles.right}>
          <View style={styles.topBar}>
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
            </Pressable>
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
  left: {
    backgroundColor: "#4f46e5",
    height: "100%",
    minWidth: 220,
    maxWidth: 280,
    flexShrink: 0,
  },
  right: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
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
});

export default Navbar;
