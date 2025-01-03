import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ApiResponse<BEData> = {
  data: BEData;
  status: 'INITIAL' | 'SUCCCESS' | 'FAIL' | 'LOADING';
  errorMessage: string;
};

type Product = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

const SampleFlatlist = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [apiProducts, setApiProducts] = useState<ApiResponse<Product[]>>({
    data: [],
    status: 'INITIAL',
    errorMessage: '',
  });
  const [page, setPage] = useState<number>(1);

  const fetchMoreProducts = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchProducts(newPage);
  };

  const fetchProducts = async (page = 1) => {
    setApiProducts(prev => ({
      ...prev,
      status: 'LOADING',
    }));
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=10`,
      );
      const data = await response.json();
      setApiProducts({
        data: [...apiProducts.data, ...data],
        status: 'SUCCCESS',
        errorMessage: '',
      });
      if (page === 1) {
        setProducts([...data]);
      } else setProducts([...products, ...data]);
    } catch (errorMessage) {
      setApiProducts({
        data: [],
        status: 'FAIL',
        errorMessage: String(errorMessage),
      });
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      {products.length == 0 && (
        <TouchableOpacity
          onPress={() =>
            products.length > 0 ? fetchMoreProducts() : fetchProducts()
          }
          style={{
            backgroundColor: 'red',
            padding: 5,
            width: 120,
            borderRadius: 10,
          }}>
          <Text
            style={{color: 'white', textAlign: 'center', fontWeight: '700'}}>
            {products.length > 0 ? 'Get More Products' : 'Get Products...'}
          </Text>
        </TouchableOpacity>
      )}
      <FlatList
        ListFooterComponent={() => {
          if (products.length === 0) {
            return null;
          }
          return (
            <View style={{padding: 20}}>
              <ActivityIndicator />
            </View>
          );
        }}
        refreshing={apiProducts.status === 'LOADING'}
        onRefresh={() => {
          fetchProducts(1);
        }}
        data={products}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMoreProducts}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 10}}
        windowSize={10}
        renderItem={({item}) => {
          return (
            <View style={{flex: 1}}>
              <Image
                source={{uri: item.download_url}}
                style={{width: 300, height: 200}}
              />
              <Text style={{textAlign: 'center'}}>ID: {item.id}</Text>
              <Text style={{textAlign: 'center'}}>Author: {item.author}</Text>
              <Text style={{textAlign: 'center'}}>Width: {item.width}</Text>
              <Text style={{textAlign: 'center'}}>Height: {item.height}</Text>
              <Text style={{textAlign: 'center'}}>URL: {item.url}</Text>
              <View
                style={{height: 1, backgroundColor: 'gray', marginVertical: 5}}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default SampleFlatlist;
