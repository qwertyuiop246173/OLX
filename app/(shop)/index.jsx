import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import ProductListItem from "../components/product-list-item"
import ListHeader from "../components/list-header"
import { getProductsAndCategories } from "../api/api";
import { useTheme } from '../providers/theme-provider'

const Home = () => {
  const { data, error, isLoading } = getProductsAndCategories();
  const { theme } = useTheme();

  if (isLoading) return <ActivityIndicator />;

  if (error || !data)
    // --- changed: themed error container and text ---
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <Text style={[styles.errorText, theme === 'dark' && styles.errorTextDark]}>
          Error {error?.message || 'An error occured'}
        </Text>
      </View>
    );


  return (
    // <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
    // <View style={[styles.container, theme === 'dark' && { backgroundColor: '#222' }]}>
    <View style={[styles.container, theme === 'dark' && { backgroundColor: '#222' }]}>
      <FlatList
        data={data.products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<ListHeader categories={data.categories} />}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#222',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  errorTextDark: {
    color: '#fff',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumn: {
    justifyContent: 'space-between',
  },
});