import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

const ROLE_ROUTES: Record<string, string> = {
  student: "/(tabs)/student",
  parent: "/(tabs)/parent",
  teacher: "/(tabs)/teacher",
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        Alert.alert("Login Failed", "Invalid email or password.");
        return;
      }

      const data = await res.json();
      await SecureStore.setItemAsync("token", data.accessToken);
      await SecureStore.setItemAsync("role", data.role);

      router.replace((ROLE_ROUTES[data.role] ?? "/(tabs)/student") as never);
    } catch {
      Alert.alert("Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modern School OS</Text>
      <Text style={styles.subtitle}>Sign in to your portal</Text>

      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Signing in…" : "Sign In"}</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Forgot password? Contact your school administrator.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1e3a5f", justifyContent: "center", paddingHorizontal: 24 },
  title: { fontSize: 28, fontWeight: "700", color: "#ffffff", textAlign: "center", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#93c5fd", textAlign: "center", marginBottom: 32 },
  input: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: 14,
    color: "#ffffff",
    marginBottom: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#1e3a5f", fontWeight: "700", fontSize: 15 },
  hint: { color: "#93c5fd", textAlign: "center", fontSize: 12, marginTop: 20 },
});
