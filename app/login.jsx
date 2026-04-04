import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { LoginUser } from "../constants/API";
import AppConttext from "../hooks/appContext";

const LoginScreen = () => {
    const { setUser } = useContext(AppConttext);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    const router = useRouter();

    const handleLogin = async () => {
        if (!name || !password) {
            setErrorText("name and password are required");
            return;
        }

        setLoading(true);
        setErrorText("");

        try {
            const res = await LoginUser({ name, password });
            console.log(res);
            
            if (res.success) {
                setUser(res.user)
                alert("success 🎉\n welcome "+res.user.name);
                router.replace("/(tabs)");
            }
            else {
                // alert
                setErrorText(res.message)
            }
        } catch (err) {
            const message =
                err?.response?.data?.message || err.message || "";
            setErrorText("⚠️ some thing went  wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome Back 👋</Text>
                <Text style={styles.subtitle}>Log in to your account</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        setErrorText("");
                    }}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setErrorText("");
                    }}
                />

                {/* 🔴 הודעת שגיאה למשתמש */}
                {errorText ? (
                    <Text style={styles.errorText}>{errorText}</Text>
                ) : null}

                <TouchableOpacity
                    style={[styles.button, loading && { opacity: 0.6 }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    Don’t have an account?{" "}
                    <Text
                        style={styles.link}
                        onPress={() => router.replace("/reagister")}
                    >
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 40,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginTop: 8,
    },
    form: {
        width: "100%",
    },
    input: {
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
        fontSize: 14,
    },
    button: {
        backgroundColor: "#4A90E2",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    footerText: {
        marginTop: 20,
        textAlign: "center",
        color: "#555",
    },
    link: {
        color: "#4A90E2",
        fontWeight: "600",
    },
});
