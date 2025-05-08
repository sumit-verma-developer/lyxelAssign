import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  ListRenderItem,
} from 'react-native';
import SubProductItem from '../components/SubProductItem';
import API from '../services/api';
import {Product, SectionedProduct} from '../types';
import Loader from '../commons/Loader';
import {Colors} from '../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import ScreenWrapper from '../commons/ScreenWrapper';

const ProductScreen: FC = () => {
  const [products, setProducts] = useState<SectionedProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch product list from API
      const productList = await API.post('products', {
        tabType: 'delivery',
        store_id: '27bb8b72-d0e7-4da1-9bf0-58dc802931d7',
        category_id: '47c817e5-659b-4af3-8c5a-81ed50430711',
      });
      console.log('productList', productList);
      if (
        productList?.data?.status_code == 200 &&
        productList?.data?.message.includes(
          'Successfully fetched products data',
        )
      ) {
        const sectioned = (
          productList?.data?.data[0]?.sub_categories || []
        ).map((section: any) => ({
          title: section?.name,
          data: section?.products,
        }));

        setProducts(sectioned || []);
      }
    } catch {
      Alert.alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const renderSubItem: ListRenderItem<Product> = useCallback(({item}) => {
    return <SubProductItem item={item} />;
  }, []);

  const renderSection: ListRenderItem<SectionedProduct> = useCallback(
    ({item}) => {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{item?.title}</Text>
          <FlatList
            data={item?.data}
            renderItem={renderSubItem}
            keyExtractor={item => item?.id?.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
          />
        </View>
      );
    },
    [renderSubItem],
  );

  return (
    <ScreenWrapper header={false}>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderSection}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          ListFooterComponent={
            products?.length === 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '80%',
                }}>
                <Text style={styles.dataFoundText}>No Data Found</Text>
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={10}
          removeClippedSubviews
        />
        <Loader loading={loading} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.background, flex: 1},

  card: {
    backgroundColor: '#FFF1E6',
    borderRadius: 12,
    padding: 10,
    margin: 10,
    flex: 1,
    alignItems: 'center',
  },
  title: {fontWeight: 'bold', marginTop: 5},
  desc: {fontSize: RFValue(10), color: '#777'},
  price: {marginTop: 5, color: '#F7931E', fontWeight: 'bold'},
  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
    color: '#6C3428',
  },
  listContainer: {
    paddingVertical: 10,
  },
  section: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E6D6BC',
    paddingBottom: 20,
  },

  horizontalList: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  dataFoundText: {
    fontSize: RFValue(14),
    color: '#E6D6BC',
    textAlign: 'center',
  },
});

export default ProductScreen;
