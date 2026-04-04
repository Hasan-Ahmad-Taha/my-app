import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Card from '@/components/Card';
import AppConttext from '@/hooks/appContext';
import Search from '../../components/Search.jsx';
import { deleteProduct, findAllProduct, isLive } from "../../constants/API.js";

const HomePage = () => {
  const router = useRouter();
  const { user } = useContext(AppConttext);

  // States
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false); // Toggle for edit mode

  const searchData = (text) => {
    const formattedQuery = text.toLowerCase();
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(formattedQuery)
    );
    setFilterData(filtered);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await findAllProduct();
      const fetchedProducts = res.product || [];
      setProducts(fetchedProducts);
      setFilterData(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);

    if (confirmed) {
      try {
        // 1. Call the API first
        const response = await deleteProduct(id);
        console.log(response);

        // 2. Check if the deletion was successful on the server
        // Note: Adjust 'response.success' based on your fetchApi's return structure
        if (response) {
          const updated = products.filter((p) => p._id !== id);
          setProducts(updated);
          setFilterData(updated);

          // Optional: Add a web-friendly success toast or alert
          // alert("Product deleted successfully");
        } else {
          alert("Failed to delete the product. Please try again.");
        }
      } catch (error) {
        // 3. Handle network or server errors
        console.error("Error deleting product:", error);
        alert("An error occurred while trying to delete the product.");
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      await isLive();
      await getData();
    };
    init();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          {user?.name ? (
            <>
              <Text style={styles.welcomeText}>Hello,</Text>
              <Text style={styles.headerTitle}>{user.name}</Text>
            </>
          ) : (
            <Text style={styles.headerTitle}>FC Kfar Qasem</Text>
          )}
        </View>

        <View style={styles.headerButtons}>
          {/* Edit Toggle Button */}
          {
            user?.admin &&
            <>
              <TouchableOpacity
                style={[styles.editButton, isEditMode && styles.activeEdit]}
                onPress={() => setIsEditMode(!isEditMode)}
              >
                <MaterialCommunityIcons
                  name={isEditMode ? "check" : "pencil-outline"}
                  size={18}
                  color="#fff"
                />
                <Text style={styles.actionText}>{isEditMode ? "Done" : "Edit"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => router.push('/create')}
              >
                <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                <Text style={styles.actionText}>Add</Text>
              </TouchableOpacity>
            </>
          }
          <TouchableOpacity
            style={styles.login}
            onPress={() => router.push(user?.name ? 'user' : 'login')}
          >
            <MaterialCommunityIcons name="account-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>{user?.name ? user?.name : 'login'}</Text>
          </TouchableOpacity>

        </View>
      </View>

      <Search Searchdata={searchData} />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#f33308b9" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.screen}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.listContainer}>
            {filterData.length > 0 ? (
              filterData.map((item, index) => (
                <Card
                  key={item._id || index}
                  {...item}
                  imege={item.image}
                  isEditMode={isEditMode}
                  onDelete={(id, name) => handleDelete(id, name)}
                />
              ))
            ) : (
              <Text style={styles.emptyText}>No products found.</Text>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#f33308b9' },
  welcomeText: { fontSize: 12, color: '#888' },
  headerButtons: { flexDirection: 'row', alignItems: 'center' },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#6c757d',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  activeEdit: { backgroundColor: '#ffc107' },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  login: {
    flexDirection: 'row',
    backgroundColor: '#f33308b9',
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: { color: '#fff', fontWeight: '600', fontSize: 13, marginLeft: 4 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#888' },
  screen: { flex: 1 },
  scrollContent: { paddingBottom: 30 },
  listContainer: { paddingHorizontal: 10, marginTop: 10 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#888', fontSize: 16 }
});