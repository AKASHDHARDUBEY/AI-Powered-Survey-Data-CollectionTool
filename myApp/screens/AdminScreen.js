import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';

const AdminScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Sample data - in real app, this would come from API
  const [inventory, setInventory] = useState([
    { id: '1', name: 'Premium Rice 5kg', stock: 50, price: 250, category: 'Food' },
    { id: '2', name: 'Cooking Oil 1L', stock: 30, price: 120, category: 'Food' },
    { id: '3', name: 'Wheat Flour 2kg', stock: 25, price: 80, category: 'Food' },
    { id: '4', name: 'Toilet Paper 12 rolls', stock: 15, price: 180, category: 'Home' },
    { id: '5', name: 'Detergent Powder 1kg', stock: 20, price: 150, category: 'Home' },
    { id: '6', name: 'Detergent Powder 5kg', stock: 20, price: 150, category: 'Home' },
  ]);

  const [orders] = useState([
    { id: '1', customer: 'Janne Doe', total: 450, status: 'Pending', date: '2024-01-15' },
    { id: '2', customer: 'Jane Smith', total: 320, status: 'Completed', date: '2024-01-14' },
    { id: '3', customer: 'Bob Johnson', total: 180, status: 'Processing', date: '2024-01-14' },
    { id: '4', customer: 'Alice Brown', total: 250, status: 'Pending', date: '2024-01-13' },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const product = {
      id: (inventory.length + 1).toString(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
    };

    setInventory([...inventory, product]);
    setNewProduct({ name: '', price: '', stock: '', category: '' });
    Alert.alert('Success', 'Product added successfully!');
  };

  const updateStock = (productId, newStock) => {
    setInventory(inventory.map(item =>
      item.id === productId ? { ...item, stock: newStock } : item
    ));
  };

  const renderInventoryItem = ({ item }) => (
    <View style={styles.inventoryItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
      </View>
      <View style={styles.stockContainer}>
        <Text style={styles.stockLabel}>Stock:</Text>
        <TextInput
          style={styles.stockInput}
          value={item.stock.toString()}
          onChangeText={(text) => updateStock(item.id, parseInt(text) || 0)}
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.customerName}>{item.customer}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.orderTotal}>₹{item.total}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#27ae60';
      case 'Processing': return '#f39c12';
      case 'Pending': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getInventoryStats = () => {
    const totalProducts = inventory.length;
    const lowStockItems = inventory.filter(item => item.stock < 10).length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.stock), 0);
    
    return { totalProducts, lowStockItems, totalValue };
  };

  const stats = getInventoryStats();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalProducts}</Text>
          <Text style={styles.statLabel}>Total Products</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.lowStockItems}</Text>
          <Text style={styles.statLabel}>Low Stock</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹{stats.totalValue}</Text>
          <Text style={styles.statLabel}>Inventory Value</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'inventory' && styles.activeTab]}
          onPress={() => setActiveTab('inventory')}
        >
          <Text style={[styles.tabText, activeTab === 'inventory' && styles.activeTabText]}>
            Inventory
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[styles.tabText, activeTab === 'orders' && styles.activeTabText]}>
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'add' && styles.activeTab]}
          onPress={() => setActiveTab('add')}
        >
          <Text style={[styles.tabText, activeTab === 'add' && styles.activeTabText]}>
            Add Product
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'inventory' && (
          <View>
            <Text style={styles.sectionTitle}>Inventory Management</Text>
            <FlatList
              data={inventory}
              renderItem={renderInventoryItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {activeTab === 'orders' && (
          <View>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <FlatList
              data={orders}
              renderItem={renderOrderItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {activeTab === 'add' && (
          <View style={styles.addProductForm}>
            <Text style={styles.sectionTitle}>Add New Product</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({...newProduct, name: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({...newProduct, price: text})}
              keyboardType="numeric"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Stock Quantity"
              value={newProduct.stock}
              onChangeText={(text) => setNewProduct({...newProduct, stock: text})}
              keyboardType="numeric"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newProduct.category}
              onChangeText={(text) => setNewProduct({...newProduct, category: text})}
            />
            
            <TouchableOpacity style={styles.addButton} onPress={addProduct}>
              <Text style={styles.addButtonText}>Add Product</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    margin: 5,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  inventoryItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  itemCategory: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  stockContainer: {
    alignItems: 'center',
  },
  stockLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  stockInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    width: 60,
    textAlign: 'center',
    fontSize: 14,
  },
  orderItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  customerName: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  orderDate: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 2,
  },
  orderDetails: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  addProductForm: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminScreen;
