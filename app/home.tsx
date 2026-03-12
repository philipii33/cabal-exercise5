// ═══════════════════════════════════════════════════════════════
// HOME SCREEN — Starbucks Green Asymmetric Dashboard Layout
// Left sidebar nav + main content w/ staggered floating cards.
// ═══════════════════════════════════════════════════════════════

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts, Gradients, Radii, Shadow, Spacing } from "../constants/theme";
import { useAuth } from "../hooks/useAuth";

const { width: screenWidth } = Dimensions.get("window");
const isWideScreen = screenWidth >= 768;
const sidebarWidth = isWideScreen ? screenWidth * 0.25 : 0;
const contentOffset = isWideScreen ? sidebarWidth : 0;

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const hasName = firstName || lastName;
  const displayName = hasName
    ? `${firstName} ${lastName}`.trim()
    : (user?.email ?? "there");
  const shortName = hasName ? firstName || displayName : "You";
  const initials = hasName
    ? `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase()
    : (user?.email?.[0] ?? "?").toUpperCase();

  const navItems = [
    { icon: "home-outline" as const, label: "Home", active: true },
    { icon: "person-outline" as const, label: "Profile" },
    { icon: "flash-outline" as const, label: "Sessions" },
    { icon: "people-outline" as const, label: "Network" },
    { icon: "star-outline" as const, label: "Rewards" },
    { icon: "settings-outline" as const, label: "Settings" },
  ];

  const stats = [
    { icon: "flash-outline" as const, label: "Active Sessions", value: "12" },
    { icon: "star-outline" as const, label: "Loyalty Points", value: "1,247" },
    { icon: "people-outline" as const, label: "Connections", value: "89" },
  ];

  return (
    <LinearGradient
      colors={Gradients.background}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        {/* Sidebar */}
        {isWideScreen && (
          <View style={[styles.sidebar, { width: sidebarWidth }]}>
            <LinearGradient colors={Gradients.primary} style={styles.sidebarGradient}>
              <Text style={styles.sidebarTitle}>Dashboard</Text>
            </LinearGradient>
            <ScrollView style={styles.navScroll}>
              {navItems.map((item, i) => (
                <TouchableOpacity key={item.label} style={styles.navItem}>
                  <Ionicons name={item.icon} size={20} color={Colors.greenLight} />
                  <Text style={styles.navLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.logoutItem} onPress={logout}>
                <Ionicons name="log-out-outline" as any size={20} color={Colors.textSecondary} />
                <Text style={styles.navLabel}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}

        {/* Main Content */}
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingLeft: contentOffset }]}
          showsVerticalScrollIndicator={false}
          style={isWideScreen ? { marginLeft: sidebarWidth } : {}}
        >
          {/* Hero - Offset to right, overlapping sidebar on wide */}
          <View style={[styles.hero, { left: contentOffset / 2 }]}>
            {/* Glow orb */}
            <View style={styles.heroGlow} />
            <View style={[styles.heroCard, Shadow.card]}>
              <LinearGradient
                colors={Gradients.primary}
                style={styles.heroAccent}
              />
              <View style={styles.topRow}>
                <Text style={styles.heroLabel}>Welcome Back</Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="shield-checkmark" size={12} color={Colors.greenLight} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              </View>
              <Text style={styles.heroName}>{shortName}</Text>
              <Text style={styles.heroSub}>Your loyalty dashboard is ready</Text>
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <LinearGradient
                  colors={Gradients.button}
                  style={styles.avatarFallback}
                >
                  <Text style={styles.avatarInit}>{initials}</Text>
                </LinearGradient>
              )}
            </View>
          </View>

          {/* Floating Stats Cards - Staggered */}
          <View style={styles.statsContainer}>
            {stats.map((stat, i) => (
              <View
                key={stat.label}
                style={[
                  styles.statCard,
                  Shadow.green,
                  {
                    transform: [{ translateY: i * 20 }, { rotate: `${i * 2}deg` }],
                    top: i * 30,
                  },
                ]}
              >
                <View style={styles.statIconWrap}>
                  <Ionicons name={stat.icon} size={18} color={Colors.greenLight} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Quick Actions Grid */}
          <Text style={styles.sectionLabel}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {[
              { icon: "qr-code-outline" as const, label: "Scan QR" },
              { icon: "gift-outline" as const, label: "Rewards" },
              { icon: "location-outline" as const, label: "Find Store" },
              { icon: "cafe-outline" as const, label: "Order" },

            ].map((action) => (
              <TouchableOpacity key={action.label} style={styles.actionCard}>
                <View style={styles.actionIcon}>
                  <Ionicons name={action.icon} size={24} color={Colors.green} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Dev Note */}
          {!isWideScreen && (
            <View style={styles.devNote}>
              <Ionicons name="code-outline" size={13} color={Colors.textSecondary} />
              <Text style={styles.devText}>
                <Text style={styles.highlight}>Pro Tip:</Text> Sidebar becomes bottom nav on mobile.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Mobile Bottom Nav */}
        {!isWideScreen && (
          <View style={styles.bottomNav}>
            {navItems.slice(0, 4).map((item) => (
              <TouchableOpacity key={item.label} style={styles.bottomNavItem}>
                <Ionicons name={item.icon} size={24} color={Colors.greenLight} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

// ── Styles ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },

  // Sidebar
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: "rgba(8,18,10,0.95)",
    borderRightWidth: 1,
    borderColor: Colors.borderGreen,
  },
  sidebarGradient: {
    padding: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  sidebarTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "700",
    fontFamily: Fonts.display,
  },
  navScroll: { flex: 1 },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    padding: Spacing.lg,
    paddingLeft: Spacing.xl,
  },
  navLabel: {
    color: Colors.greenLight,
    fontSize: 14,
    fontFamily: Fonts.body,
    fontWeight: "500",
  },
  logoutItem: {
    marginTop: "auto",
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  // Main scroll
  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl * 2,
  },

  // Hero
  hero: {
    position: "relative",
    alignItems: "flex-end",
    marginBottom: Spacing.xxl,
  },
  heroGlow: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    top: -100,
    right: -50,
    backgroundColor: Colors.greenGlow,
    opacity: 0.3,
  },
  heroCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    overflow: "hidden",
  },
  heroAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: Radii.xl,
    borderBottomLeftRadius: Radii.xl,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  heroLabel: {
    fontSize: 12,
    letterSpacing: 3,
    color: Colors.green,
    fontWeight: "700",
    fontFamily: Fonts.body,
  },
  heroName: {
    fontSize: 42,
    fontWeight: "800",
    color: Colors.textPrimary,
    fontFamily: Fonts.display,
    lineHeight: 48,
    marginBottom: Spacing.sm,
  },
  heroSub: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontFamily: Fonts.body,
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.greenLight,
    alignSelf: "flex-end",
  },
  avatarFallback: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInit: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "700",
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.greenPale,
    borderRadius: Radii.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
  },
  verifiedText: {
    color: Colors.greenLight,
    fontSize: 12,
    fontWeight: "600",
  },

  // Stats
  statsContainer: {
    position: "relative",
    height: 200,
    marginBottom: Spacing.xxl,
  },
  statCard: {
    position: "absolute",
    width: 140,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    alignItems: "center",
    gap: 8,
    left: 0,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.greenPale,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // Actions
  sectionLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.body,
    letterSpacing: 2.5,
    fontWeight: "700",
    marginBottom: Spacing.lg,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.lg,
  },
  actionCard: {
    width: 140,
    height: 100,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.greenPale,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  actionLabel: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  // Bottom Nav (mobile)
  bottomNav: {
    flexDirection: "row",
    backgroundColor: Colors.glass,
    borderTopWidth: 1,
    borderColor: Colors.borderGreen,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    justifyContent: "space-around",
  },
  bottomNavItem: {
    alignItems: "center",
    padding: Spacing.sm,
  },

  // Dev
  devNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    backgroundColor: Colors.glassInput,
    borderRadius: Radii.md,
    padding: Spacing.lg,
    marginTop: Spacing.xl,
  },
  devText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    fontFamily: Fonts.body,
    lineHeight: 20,
  },
  highlight: {
    color: Colors.greenLight,
    fontWeight: "700",
  },
});

