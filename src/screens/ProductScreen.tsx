import React, { FC, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert } from 'react-native';
import API from '../services/api';
import { Product } from '../types';

const ProductScreen:FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const res = await API.post('products', {
        tabType: 'delivery',
        store_id: '27bb8b72-d0e7-4da1-9bf0-58dc802931d7',
        category_id: '47c817e5-659b-4af3-8c5a-81ed50430711',
      });
      setProducts(res.data.products || []);
    } catch {
      Alert.alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_link }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.price}>₹ {item.delivery_price}</Text>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={products}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={(_, i) => i.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  card: {
    backgroundColor: '#FFF1E6',
    borderRadius: 12,
    padding: 10,
    margin: 10,
    flex: 1,
    alignItems: 'center',
  },
  image: { width: 100, height: 100, borderRadius: 10 },
  title: { fontWeight: 'bold', marginTop: 5 },
  desc: { fontSize: 12, color: '#777' },
  price: { marginTop: 5, color: '#F7931E', fontWeight: 'bold' },
});

export default ProductScreen;
