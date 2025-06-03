import type { ReactNode } from "react";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

export type SidebarNavItem = {
  name: string;
  icon: React.ComponentType<any>;
  href?: string;
  count?: string;
  current?: boolean;
  onPress?: () => void;
};

export type SidebarTeam = {
  id: string | number;
  name: string;
  initial: string;
  href?: string;
  current?: boolean;
  onPress?: () => void;
};

export interface SidebarProps {
  navigation: SidebarNavItem[];
  teams?: SidebarTeam[];
  profile?: {
    name: string;
    avatarUrl: string;
    onPress?: () => void;
  };
  style?: ViewStyle;
  headerLogoUrl?: string;
  headerLogoAlt?: string;
  children?: ReactNode;
}

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar: React.FC<SidebarProps> = ({
  navigation,
  teams = [],
  profile,
  style,
  headerLogoUrl = "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white",
  headerLogoAlt = "Your Company",
  children,
}) => {
  return (
    <View style={[styles.sidebar, style]}>
      <View style={styles.header}>
        <Image
          source={{ uri: headerLogoUrl }}
          accessibilityLabel={headerLogoAlt}
          style={styles.logo}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Pressable
                key={item.name}
                onPress={item.onPress}
                style={({ pressed }) => [
                  styles.navItem,
                  item.current && styles.navItemActive,
                  pressed && !item.current && styles.navItemPressed,
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: !!item.current }}
              >
                <Icon
                  color={item.current ? "#fff" : "#c7d2fe"}
                  size={24}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={[styles.navText, item.current && styles.navTextActive]}
                >
                  {item.name}
                </Text>
                {!!item.count && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{item.count}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
        {!!teams.length && (
          <View style={styles.teamsSection}>
            <Text style={styles.teamsLabel}>Your teams</Text>
            {teams.map((team) => (
              <Pressable
                key={team.id}
                onPress={team.onPress}
                style={({ pressed }) => [
                  styles.teamItem,
                  team.current && styles.teamItemActive,
                  pressed && !team.current && styles.teamItemPressed,
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: !!team.current }}
              >
                <View style={styles.teamInitial}>
                  <Text style={styles.teamInitialText}>{team.initial}</Text>
                </View>
                <Text style={styles.teamName}>{team.name}</Text>
              </Pressable>
            ))}
          </View>
        )}
        {children}
      </ScrollView>
      {profile && (
        <Pressable
          onPress={profile.onPress}
          style={({ pressed }) => [
            styles.profile,
            pressed && styles.profilePressed,
          ]}
          accessibilityRole="button"
        >
          <Image
            source={{ uri: profile.avatarUrl }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>{profile.name}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "#4f46e5",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  header: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4f46e5",
  },
  logo: {
    height: 32,
    width: 32,
    resizeMode: "contain",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 4,
    backgroundColor: "transparent",
  },
  navItemActive: {
    backgroundColor: "#3730a3",
  },
  navItemPressed: {
    backgroundColor: "#6366f1",
  },
  navText: {
    color: "#c7d2fe",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  navTextActive: {
    color: "#fff",
  },
  countBadge: {
    backgroundColor: "#6366f1",
    borderRadius: 999,
    minWidth: 28,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  countText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  teamsSection: {
    marginTop: 24,
  },
  teamsLabel: {
    color: "#c7d2fe",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  teamItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 4,
    backgroundColor: "transparent",
  },
  teamItemActive: {
    backgroundColor: "#3730a3",
  },
  teamItemPressed: {
    backgroundColor: "#6366f1",
  },
  teamInitial: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#818cf8",
  },
  teamInitialText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  teamName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#6366f1",
    backgroundColor: "#4f46e5",
  },
  profilePressed: {
    backgroundColor: "#3730a3",
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: "#6366f1",
  },
  profileName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default Sidebar;
