import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Register } from "../constants/API";
import AppConttext from "../hooks/appContext";

export default function RegisterScreen() {
    const { setUser } = useContext(AppConttext);
    const [name, setName] = useState("");
    const [phonenumber, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    const router = useRouter();

    const validateForm = () => {
        if (!name.trim()) return "Please enter your name";
        if (!phonenumber.trim()) return "Please enter a phone number";
        if (phonenumber.length < 9) return "Invalid phone number";
        if (!age.trim()) return "Please enter your age";

        const ageNumber = Number(age);
        if (isNaN(ageNumber) || ageNumber < 14)
            return "Age must be more than 14";

        if (!password.trim()) return "Please enter a password";
        if (password.length < 6)
            return "Password must be at least 6 characters long";

        return null;
    };

    const handleRegister = async () => {
        const errorMessage = validateForm();
        if (errorMessage) {
            alert("Error " + errorMessage);
            return;
        }

        try {
            setLoading(true);

            const res = await Register({
                name: name.trim(),
                phonenumber: phonenumber.trim(),
                age: Number(age),
                password,
            });
            console.log("res", res);

            if (res.sucsess) {
                setUser(res.user)
                alert("success 🎉\n welcome " + res.user.name);
                router.replace("/(tabs)");
            }
            else {
                // alert
                setErrorText(res.message)
            }
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "An error occurred, please try again later";

            alert("server error", message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone"
                keyboardType="phone-pad"
                value={phonenumber}
                onChangeText={setPhone}
            />

            <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {errorText ? (
                <Text style={styles.errorText}>{errorText}</Text>
            ) : null}

            <TouchableOpacity
                style={[styles.button, loading && styles.disabledButton]}
                onPress={handleRegister}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Creating Account..." : "Create Account"}
                </Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Already have an account?{" "}
                <Text
                    style={styles.link}
                    onPress={() => router.replace("/login")}
                >
                    Login
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justify: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginBottom: 15,
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#4A90E2",
        padding: 15,
        borderRadius: 10,
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
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
    errorText: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
        fontSize: 14,
    },
});