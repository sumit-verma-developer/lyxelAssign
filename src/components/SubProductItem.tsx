import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Product, ProductCardProps,} from '../types';



const ProductCard: React.FC<ProductCardProps> = ({item}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: item.image_link}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={1} style={styles.desc} >{item.description}</Text>
      <Text style={styles.price}>₹ {item.delivery_price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF1E6',
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    width: 160,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
    
  },
  desc: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  price: {
    marginTop: 5,
    color: '#F7931E',
    fontWeight: 'bold',
  },
});

export default ProductCard;
