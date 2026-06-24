import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ParentHomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Child Overview</Text>

      {/* AI Report */}
      <View style={styles.aiCard}>
        <Text style={styles.aiLabel}>AI PARENT REPORT</Text>
        <Text style={styles.aiText}>
          Ayush has improved by 15% in Mathematics during the last quarter. Attendance is excellent
          at 96%. Science performance has declined slightly and may require attention.
        </Text>
      </View>

      {/* Four Pillars */}
      <View style={styles.pillarsRow}>
        {[
          { label: "Attendance", value: "92%", color: "#16a34a" },
          { label: "Grade", value: "B+", color: "#1e3a5f" },
          { label: "Behaviour", value: "Good", color: "#16a34a" },
          { label: "Fees Due", value: "₹12,500", color: "#dc2626" },
        ].map((p) => (
          <View key={p.label} style={styles.pillar}>
            <Text style={[styles.pillarValue, { color: p.color }]}>{p.value}</Text>
            <Text style={styles.pillarLabel}>{p.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Pay */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fee Due</Text>
        <Text style={styles.feeAmount}>₹12,500</Text>
        <Text style={styles.feeDue}>Due by 15 Jul 2026</Text>
        <View style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 16, paddingBottom: 32 },
  heading: { fontSize: 20, fontWeight: "700", color: "#0f172a", marginBottom: 12 },
  aiCard: { backgroundColor: "#eff6ff", borderLeftWidth: 4, borderLeftColor: "#1e3a5f", borderRadius: 8, padding: 14, marginBottom: 16 },
  aiLabel: { fontSize: 10, fontWeight: "700", color: "#1e3a5f", letterSpacing: 1, marginBottom: 4 },
  aiText: { fontSize: 13, color: "#0f172a", lineHeight: 20 },
  pillarsRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  pillar: { flex: 1, backgroundColor: "#ffffff", borderRadius: 10, padding: 12, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  pillarValue: { fontSize: 18, fontWeight: "700" },
  pillarLabel: { fontSize: 11, color: "#64748b", marginTop: 2 },
  card: { backgroundColor: "#ffffff", borderRadius: 12, padding: 16, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  cardTitle: { fontSize: 13, color: "#64748b", fontWeight: "600", marginBottom: 4 },
  feeAmount: { fontSize: 26, fontWeight: "700", color: "#dc2626" },
  feeDue: { fontSize: 12, color: "#94a3b8", marginBottom: 12 },
  payButton: { backgroundColor: "#1e3a5f", borderRadius: 8, padding: 12, alignItems: "center" },
  payButtonText: { color: "#ffffff", fontWeight: "700", fontSize: 14 },
});
