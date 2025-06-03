import { lightColors as colors } from "@/theme/colors";
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

const Sidebar: React.FC<SidebarProps> = (props) => {
  const teams = props.teams || [];
  return (
    <View style={[styles.sidebar, props.style]}>
      <View style={styles.header}>
        <Image
          source={{ uri: props.headerLogoUrl }}
          accessibilityLabel={props.headerLogoAlt}
          style={styles.logo}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {props.navigation.map((item) => {
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
                  color={
                    item.current
                      ? colors.textInverse
                      : colors.brandPrimarySubtle
                  }
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
        {props.children}
      </ScrollView>
      {props.profile && (
        <Pressable
          onPress={props.profile.onPress}
          style={({ pressed }) => [
            styles.profile,
            pressed && styles.profilePressed,
          ]}
          accessibilityRole="button"
        >
          <Image
            source={{ uri: props.profile.avatarUrl }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>{props.profile.name}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: colors.brandPrimary,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  header: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.brandPrimary,
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
    backgroundColor: colors.brandSecondary,
  },
  navItemPressed: {
    backgroundColor: colors.brandPrimaryActive,
  },
  navText: {
    color: colors.brandPrimarySubtle,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  navTextActive: {
    color: colors.textInverse,
  },
  countBadge: {
    backgroundColor: colors.brandPrimaryActive,
    borderRadius: 999,
    minWidth: 28,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  countText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: "600",
  },
  teamsSection: {
    marginTop: 24,
  },
  teamsLabel: {
    color: colors.brandPrimarySubtle,
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
    backgroundColor: colors.brandSecondary,
  },
  teamItemPressed: {
    backgroundColor: colors.brandPrimaryActive,
  },
  teamInitial: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: colors.brandPrimaryActive,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.borderAccent,
  },
  teamInitialText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: "700",
  },
  teamName: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "500",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.brandPrimaryActive,
    backgroundColor: colors.brandPrimary,
  },
  profilePressed: {
    backgroundColor: colors.brandSecondary,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: colors.brandPrimaryActive,
  },
  profileName: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "600",
  },
});

export default Sidebar;
