import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
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
  const [downloadedImageUri, setDownloadedImageUri] = useState<string | null>(
    null,
  );
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
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
  const handleDownload = async (url: string) => {
    const filename = url.split('/').pop();
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${filename}`;
    setIsDownloading(true);
    try {
      const response = await RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadDest,
      }).promise;
      setDownloadedImageUri(downloadDest);
      setIsDownloading(false);
      console.log('Image downloaded to', downloadDest);
    } catch (error) {
      setIsDownloading(false);
      console.error('Error downloading image', error);
    }
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginVertical: 40,
        backgroundColor: '#fff',
      }}>
      <StatusBar
        translucent
        backgroundColor={'rgba(0,0,0,0)'}
        barStyle="dark-content"
      />
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
            marginTop: 20,
          }}>
          <Text
            style={{color: 'white', textAlign: 'center', fontWeight: '700'}}>
            {products.length > 0 ? 'Get More Products' : 'Get Products...'}
          </Text>
        </TouchableOpacity>
      )}
      {downloadedImageUri ? (
        <Image
          source={{uri: `file://${downloadedImageUri}`}}
          style={{
            width: 300,
            height: 200,
            marginBottom: 20,
          }}
        />
      ) : (
        <Text>No image downloaded yet</Text>
      )}
      <FlatList
        ListFooterComponent={() => {
          if (products.length === 0) {
            return null;
          }
          return (
            <View style={{padding: 20}}>
              <ActivityIndicator color={'orange'} size={'large'} />
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
        contentContainerStyle={{paddingHorizontal: 10, gap: 10}}
        windowSize={10}
        renderItem={({item}) => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  elevation: 8,
                  shadowOffset: {width: 0, height: 4},
                  shadowColor: 'orange',
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  width: '100%',
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 10,
                }}>
                <Image
                  source={{uri: item.download_url}}
                  style={{width: '100%', height: 200}}
                />
                <View style={{padding: 10}}>
                  <Text style={{textAlign: 'center'}}>{item.author}</Text>
                  <Text style={{textAlign: 'center'}}> {item.url}</Text>
                  <TouchableOpacity
                    onPress={() => handleDownload(item.download_url)}>
                    <Text>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SampleFlatlist;
