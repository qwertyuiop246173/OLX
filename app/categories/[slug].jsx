import { Image, StyleSheet, Text, View, FlatList, ActivityIndicator,Pressable} from 'react-native'
import { useLocalSearchParams, Redirect, Stack } from 'expo-router'
// import { CATEGORIES } from '../../assets/categories'
// import { PRODUCTS } from '../../assets/products'
import ProductListItem from '../components/product-list-item' //  ProductListItem is not in {}
import { getCategoryAndProducts } from '../api/api'
import { useTheme } from '../providers/theme-provider'
import { FontAwesome } from '@expo/vector-icons'
import { useCartStore } from '../store/cart-store' // adjust path if needed
import { useRouter } from 'expo-router';
const Category = () => {
  const { slug } = useLocalSearchParams()
  const { theme } = useTheme()

  const { data, error, isLoading } = getCategoryAndProducts(slug);

  if (isLoading) return <ActivityIndicator />;
  if (error || !data) return <Text>Error: {error?.message}</Text>;

  // const category = CATEGORIES.find(category => category.slug === slug)
  if (!data.category || !data.products) return <Redirect href='/404' />
  // const products = PRODUCTS.filter(product => product.category.slug === slug)
  const { category, products } = data;

  function CartIconWithBadge({ theme }) {
    const router = useRouter();
    const getItemCount = useCartStore(state => state.getItemCount); // use getItemCount for consistency

    return (
      <Pressable onPress={() => router.push('/cart')} style={{ padding: 10 }}>
        <View>
          <FontAwesome
            name='shopping-cart'
            size={25}
            color='gray'
            style={{ marginRight: 15 }}
          />
          <View style={{
            position: 'absolute',
            top: -5,
            right: 10,
            backgroundColor: '#1BC464',
            borderRadius: 12,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
            }}>
              {getItemCount()}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={[styles.container, theme === 'dark' && { backgroundColor: '#222' }]}>
      {/* <Stack.Screen options={{ title: category.name }} /> */}
      <Stack.Screen
        options={{
          title: category.name,
          headerStyle: {
            backgroundColor: theme === 'dark' ? '#222' : '#fff',
          },
          headerTintColor: theme === 'dark' ? '#fff' : '#222',
          headerRight: () => <CartIconWithBadge theme={theme} />,
        }}
      />
      <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
      <Text style={[styles.categoryName, theme === 'dark' && { color: '#fff' }]}>{category.name}</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
};

export default Category

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  categoryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productsList: {
    flexGrow: 1,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
})