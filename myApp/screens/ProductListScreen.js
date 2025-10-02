import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

const ProductListScreen = ({ navigation, route }) => {
  const { userRole } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  // Sample product data - in real app, this would come from API
  const [products] = useState([
    {
      id: '1',
      name: 'Premium Rice 5kg',
      price: 250,
      stock: 50,
      category: 'Food',
      description: 'High quality basmati rice',
    },
    {
      id: '2',
      name: 'Cooking Oil 1L',
      price: 120,
      stock: 30,
      category: 'Food',
      description: 'Pure sunflower cooking oil',
    },
    {
      id: '3',
      name: 'Wheat Flour 2kg',
      price: 80,
      stock: 25,
      category: 'Food',
      description: 'Fresh wheat flour',
    },
    {
      id: '4',
      name: 'Toilet Paper 12 rolls',
      price: 180,
      stock: 15,
      category: 'Home',
      description: 'Soft 3-ply toilet paper',
    },
    {
      id: '5',
      name: 'Detergent Powder 1kg',
      price: 150,
      stock: 20,
      category: 'Home',
      description: 'Powerful cleaning detergent',
    },
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productCategory}>Category: {item.category}</Text>
        <View style={styles.priceStockContainer}>
          <Text style={styles.productPrice}>₹{item.price}</Text>
          <Text style={[
            styles.productStock,
            item.stock < 10 ? styles.lowStock : styles.goodStock
          ]}>
            Stock: {item.stock}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={[
          styles.addButton,
          item.stock === 0 && styles.disabledButton
        ]}
        onPress={() => addToCart(item)}
        disabled={item.stock === 0}
      >
        <Text style={[
          styles.addButtonText,
          item.stock === 0 && styles.disabledButtonText
        ]}>
          {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const getBulkDiscountInfo = () => {
    if (userRole === 'b2b') {
      return (
        <View style={styles.bulkInfo}>
          <Text style={styles.bulkInfoText}>
            🏢 B2B Mode: Bulk orders available with special pricing
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {userRole === 'b2b' ? 'Wholesale Products' : 
           userRole === 'admin' ? 'Inventory Management' : 'Products'}
        </Text>
        {getBulkDiscountInfo()}
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />

      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart', { cart, userRole })}
        >
          <Text style={styles.cartButtonText}>
            Cart ({cart.length} items)
          </Text>
        </TouchableOpacity>
      )}
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
  bulkInfo: {
    backgroundColor: '#e8f5e8',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  bulkInfoText: {
    color: '#27ae60',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  searchInput: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productList: {
    padding: 15,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
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
  productInfo: {
    marginBottom: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 10,
  },
  priceStockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  productStock: {
    fontSize: 14,
    fontWeight: '500',
  },
  goodStock: {
    color: '#27ae60',
  },
  lowStock: {
    color: '#e74c3c',
  },
  addButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#7f8c8d',
  },
  cartButton: {
    backgroundColor: '#e74c3c',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
