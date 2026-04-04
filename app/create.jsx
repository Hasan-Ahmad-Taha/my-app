import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { createProduct } from '../constants/API';

const CreateProduct = () => {
    const router = useRouter();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        category: ''
    });

    const handleCreate = async () => {
        // Basic validation
        if (!product.name || !product.price) {
            alert("Error\n Name and Price are required!");
            return;
        }

        try {
            const res = await createProduct(product)
            console.log("‼",res);
            
            if (res.success) {
                alert("Success Product added to the database!");
                router.replace('/')
                setProduct({ name: '', price: '', image: '', category: '' });
            }
            else {
                alert("create product fiald")
            }
        } catch (error) {
            alert("Error \n Failed to create product");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add New Product</Text>
                    <Text style={styles.subtitle}>Fill in the details below</Text>
                </View>

                <View style={styles.form}>
                    {/* Name Input */}
                    <Text style={styles.label}>Product Name *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="*product name"
                        value={product.name}
                        onChangeText={(val) => setProduct({ ...product, name: val })}
                    />

                    {/* Price Input */}
                    <Text style={styles.label}>Price ($)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={product.price}
                        onChangeText={(val) => setProduct({ ...product, price: val })}
                    />

                    {/* Category Input */}
                    <Text style={styles.label}>Category</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="*category"
                        value={product.category}
                        onChangeText={(val) => setProduct({ ...product, category: val })}
                    />

                    {/* Image URL Input */}
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="https://image-link.com"
                        value={product.image}
                        onChangeText={(val) => setProduct({ ...product, image: val })}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleCreate}>
                        <MaterialCommunityIcons name="plus-circle" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Create Product</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    scrollContainer: {
        padding: 20,
    },
    header: {
        marginBottom: 30,
        marginTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    subtitle: {
        fontSize: 16,
        color: '#718096',
        marginTop: 5,
    },
    form: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F7FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});