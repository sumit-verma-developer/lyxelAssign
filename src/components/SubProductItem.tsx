import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ProductCardProps} from '../types';
import {FONTS} from '../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

const ProductCard: React.FC<ProductCardProps> = ({item}) => {
  return (
    <View style={styles.card}>
      {item.image_link ? (
        <FastImage
          style={styles.image}
          source={{
            uri: item.image_link,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      ) : (
        <FastImage
          style={styles.image}
          source={require('../assets/images/logo.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
      <View style={{padding: 10}}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        {item?.description && (
          <Text numberOfLines={1} style={styles.desc}>
            {item?.description}
          </Text>
        )}
        <Text style={styles.price}>₹ {item?.delivery_price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF1E6',
    borderRadius: 12,
    width: 180,
    height: 240,
  },
  image: {
    width: '100%',
    height: '50%', // Half of the card height
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: FONTS.RobotoThin,
    color: '#3D4246',
  },
  desc: {
    fontSize: RFValue(10),
    color: '#777',
    textAlign: 'center',
    fontFamily: FONTS.RobotoRegular,
    paddingTop: 6,
  },
  price: {
    marginTop: 5,
    color: '#3D4246',
    fontWeight: 'bold',
    fontFamily: FONTS.RobotoBlack,
    paddingTop: 20,
    fontSize: RFValue(12),
  },
});

export default ProductCard;
