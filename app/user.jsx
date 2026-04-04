import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator, Alert,
    ScrollView, StyleSheet, Text, TextInput,
    TouchableOpacity, View
} from 'react-native';
import { UpdatUser } from '../constants/API';
import AppConttext from '../hooks/appContext';

const User = () => {
    const { user, setUser } = useContext(AppConttext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false); // حالة التحميل
    const [formData, setFormData] = useState({ ...user });
    const router = useRouter();

    // تحديث formData إذا تغير user من مصدر خارجي
    useEffect(() => {
        setFormData({ ...user });
    }, [user]);

    const handleSave = async () => {
        if (!formData.name || !formData.phonenumber) {
            Alert.alert("تنبيه", "يرجى ملء الحقول الأساسية");
            return;
        }

        setLoading(true); // بدء التحميل
        try {
            const response = await UpdatUser({ "_id": user._id, UserUpdate: formData });

            if (response.succsess) {
                setUser(formData);
                setIsEditing(false);
                Alert.alert("تم بنجاح", "تم تحديث بياناتك بنجاح");
            } else {
                Alert.alert("خطأ", response.message || "فشل التحديث");
            }
        } catch (error) {
            Alert.alert("خطأ في الاتصال", error.message);
        } finally {
            setLoading(false); // إنهاء التحميل في كل الحالات
        }
    };

    const renderField = (label, key, keyboardType = 'default', secureTextEntry = false) => (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{label}</Text>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={String(formData[key] || '')}
                    onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    placeholder={`أدخل ${label}`}
                />
            ) : (
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>
                        {secureTextEntry ? '••••••••' : (user?.[key] || 'غير محدد')}
                    </Text>
                </View>
            )}
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>الملف الشخصي</Text>

                {renderField('الإسم الكامل', 'name')}
                {renderField('رقم الهاتف', 'phonenumber', 'phone-pad')}
                {renderField('العمر', 'age', 'numeric')}
                {renderField('كلمة المرور', 'password', 'default', true)}

                <TouchableOpacity
                    style={[styles.button, isEditing ? styles.saveButton : styles.editButton]}
                    onPress={isEditing ? handleSave : () => setIsEditing(true)}
                    disabled={loading} // تعطيل الزر أثناء التحميل
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {isEditing ? 'حفظ التغييرات' : 'تعديل البيانات'}
                        </Text>
                    )}
                </TouchableOpacity>

                {isEditing && !loading && (
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => { setIsEditing(false); setFormData({ ...user }); }}
                    >
                        <Text style={styles.cancelButtonText}>إلغاء</Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                    setUser(null);
                    router.replace('/');
                }}
            >
                <Text style={styles.logoutText}>تسجيل الخروج</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default User;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
        marginTop: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 25,
        textAlign: 'center',
        color: '#1A1A1A',
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontWeight: '600',
        textAlign: 'left',
    },
    valueContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingVertical: 10,
    },
    value: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#FFF',
        color: '#333',
    },
    button: {
        marginTop: 10,
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#007AFF',
    },
    saveButton: {
        backgroundColor: '#28A745',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 15,
        padding: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    logoutButton: {
        marginTop: 30,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    logoutText: {
        color: '#FF3B30',
        fontWeight: '700',
        fontSize: 16,
    }
});