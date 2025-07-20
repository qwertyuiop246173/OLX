import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { Tables } from '../types/database.type'
import { Link } from 'expo-router'
import { useTheme } from '../providers/theme-provider'
const ProductListItem = ({ product }: { product: Tables<'product'> }) => {
  const { theme } = useTheme()
  return (
    <Link asChild href={`/product/${product.slug}`}>
      <Pressable style={styles.item}  >
        <View style={[styles.itemImageContainer, {

          borderLeftWidth: 0.2,
          borderRightWidth: 0.2,
          borderBottomWidth: 0,
          borderTopWidth: 0.2, 
          borderColor: theme === 'dark' ? '#fff' : '#222',
          backgroundColor: theme === 'dark' ? '#222' : '#fff',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        },
        ]}>
          <Image source={{ uri: product.heroImage }} style={styles.itemImage} />
        </View>
        <View style={[styles.itemTextContainer, theme === 'dark' && { backgroundColor: '#222' }, 
        {
          flex:1,
          borderLeftWidth: 0.2,
          borderRightWidth: 0.2,
          borderBottomWidth: 0.2,
          borderTopWidth: 0,
          borderColor: theme === 'dark' ? '#fff' : '#222',
          backgroundColor: theme === 'dark' ? '#222' : '#fff',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }]}>
          <Text style={[styles.itemTitle, theme === 'dark' && { color: '#fff' }]}>{product.title}</Text>
          <Text style={[styles.itemPrice, theme === 'dark' && { color: '#fff' }]}>${product.price.toFixed(2)}</Text>
        </View>
      </Pressable>
    </Link >

  )
}

export default ProductListItem

const styles = StyleSheet.create({
  item: {
    width: '48%',
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',

  },
  itemImageContainer: {
    borderRadius: 10,
    width: '100%',
    height: 150,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  itemTextContainer: {
    padding: 8,
    alignItems: 'flex-start',
    gap: 4,

  },
  itemTitle: {
    fontSize: 16,
    color: '#888',
    flex:1
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    flex:1
  },
})