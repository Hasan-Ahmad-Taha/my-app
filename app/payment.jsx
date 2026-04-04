import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const Payment = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handlePayment = () => {
        // Here you would normally call your API
        console.log("Processing Payment:", form);
        alert("Payment successful!",)
        router.replace('/') // Navigates to home and replaces history
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    <Text style={styles.title}>Payment</Text>

                    <View style={styles.paymentCard}>
                        {/* Cardholder Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Cardholder's Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='John Doe'
                                placeholderTextColor={'#999'}
                                value={form.name}
                                onChangeText={(val) => handleInputChange('name', val)}
                            />
                        </View>

                        {/* Card Number */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Card Number</Text>
                            <View style={styles.inputWithIcon}>
                                <TextInput
                                    style={[styles.input, { flex: 1, borderWidth: 0 }]}
                                    placeholder='0000 0000 0000 0000'
                                    placeholderTextColor={'#999'}
                                    keyboardType='numeric'
                                    maxLength={16}
                                    value={form.cardNumber}
                                    onChangeText={(val) => handleInputChange('cardNumber', val)}
                                />
                                <MaterialCommunityIcons name="credit-card-outline" size={20} color="#7dae73" />
                            </View>
                        </View>

                        {/* Expiry and CVC Row */}
                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                <Text style={styles.label}>Expiry</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='MM/YY'
                                    placeholderTextColor={'#999'}
                                    keyboardType='numeric'
                                    maxLength={5}
                                    value={form.expiry}
                                    onChangeText={(val) => handleInputChange('expiry', val)}
                                />
                            </View>

                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>CVC</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='123'
                                    placeholderTextColor={'#999'}
                                    keyboardType='numeric'
                                    maxLength={3}
                                    secureTextEntry={true}
                                    value={form.cvc}
                                    onChangeText={(val) => handleInputChange('cvc', val)}
                                />
                            </View>
                        </View>

                        {/* Buy Button */}
                        <TouchableOpacity
                            style={styles.buyButton}
                            onPress={handlePayment}
                        >
                            <Text style={styles.buyButtonText}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Payment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    paymentCard: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        width: "100%",
        // iOS Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        // Android Shadow
        elevation: 5,
        borderWidth: 1,
        borderColor: '#7dae7344',
    },
    inputGroup: {
        marginBottom: 18,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e1e1e1',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 12,
        paddingRight: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buyButton: {
        backgroundColor: "#7dae73",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});