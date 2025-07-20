import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
// import { PRODUCTS } from '../../assets/products'
import { useCartStore } from '../store/cart-store'
import { useState } from 'react'
import { getProduct } from '../api/api'
import { useTheme } from '../providers/theme-provider'
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'
import { Dimensions } from 'react-native'; // <-- add this
const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768; // You can adjust this breakpoint as needed

const heroImageHeight = isTablet ? 600 : 250; // Tablet: 600, Mobile: 250
const ProductDetails = () => {
    const { slug } = useLocalSearchParams()
    const toast = useToast()//Toast Added
    const { theme } = useTheme()

    const { data: product, error, isLoading } = getProduct(slug);

    const { width: screenWidth } = Dimensions.get('window');
    const isTablet = screenWidth >= 768; // You can adjust this breakpoint as needed

    const heroImageHeight = isTablet ? 400 : 250; // Tablet: 400, Mobile: 250



    // const product = PRODUCTS.find(product => product.slug === slug)earlier used

    const { items, addItem, incrementItem, decrementItem } = useCartStore()
    const cartItem = items.find(item => item.id === product?.id)
    const initialQuantity = cartItem ? cartItem.quantity : 1
    const [quantity, setQuantity] = useState(initialQuantity)

    if (isLoading) return <ActivityIndicator />;

    if (!product) return <Redirect href='/404' />
    if (error)
        return <Text>Error : {error.message}</Text>;

    const increaseQuantity = () => {
        if (quantity < product.maxQuantity) {
            setQuantity(prev => prev + 1)
            incrementItem(product.id)
        } else {
            toast.show('Cannot add more than available quantity', {
                type: 'warning',
                placement: 'top',
                duration: 1500
            })
        }
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
            decrementItem(product.id)
        }
    }

    const addToCart = () => {
        addItem({
            id: product.id,
            title: product.title,
            heroImage: product.heroImage, //image: product.heroImage replaced to heroImage: product.heroImage for admin use
            price: product.price,
            quantity,
            maxQuantity: product.maxQuantity //added for admin use
        })
        toast.show("ADDED TO CART YEAH!!", {
            type: 'SUCCESS',
            placement: 'top',
            duration: 1500
        })
    }

    const totalPrice = (product.price * quantity).toFixed(2)


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
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            {/* <Stack.Screen options={{ title: product.title }} /> */}
            <Stack.Screen
                options={{
                    title: product.title,
                    headerStyle: {
                        backgroundColor: theme === 'dark' ? '#222' : '#fff',
                    },
                    headerTintColor: theme === 'dark' ? '#fff' : '#222',
                    headerRight: () => <CartIconWithBadge theme={theme} />
                }}
            />
            <Image source={{ uri: product.heroImage }} style={styles.heroImage} />
            <View style={{ padding: 16, flex: 1 }}>
                <Text style={[styles.title, theme === 'dark' && { color: '#fff' }]}>Title:{product.title}</Text>
                <Text style={[styles.slug, theme === 'dark' && { color: '#fff' }]}>Slug:{product.slug}</Text>
                <View style={styles.priceContainer}>
                    <Text style={[styles.price, theme === 'dark' && { color: '#fff' }]}>Unit Price: ${product.price.toFixed(2)}</Text>
                    <Text style={[styles.price, theme === 'dark' && { color: '#fff' }]}>Total Price: ${totalPrice}</Text>
                </View>
                <FlatList
                    data={product.imagesUrl}
                    renderItem={({ item, index }) =>
                        <Image source={{ uri: item }} style={styles.image} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.imagesContainer}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={decreaseQuantity}
                        disabled={quantity <= 1}>
                        <Text style={[styles.quantityButtonText, theme === 'dark' && { color: '#fff' }]}>-</Text>
                    </TouchableOpacity>
                    <Text style={[styles.quantity, theme === 'dark' && { color: '#fff' }]}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={increaseQuantity}
                    // disabled={quantity >= product.maxQuantity}
                    >
                        <Text style={[styles.quantityButtonText, theme === 'dark' && { color: '#fff' }]}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.addToCartButton}
                        onPress={addToCart}
                        disabled={quantity === 0}>
                        <Text style={[styles.addToCartText, theme === 'dark' && { color: '#fff' }]}>Add to Cart</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heroImage: {
        // width: '100%',
        // height: 250,
        // resizeMode: 'cover',
        width: screenWidth, // <-- full screen width
        height: heroImageHeight, // <-- responsive height
        resizeMode: 'cover',
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    slug: {
        fontSize: 18,
        color: '#555',
        marginBottom: 16,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    price: {
        fontWeight: 'bold',
        color: '#000',
    },

    imagesContainer: {
        marginBottom: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    quantityButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    quantityButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 16,
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorMessage: {
        fontSize: 18,
        color: '#f00',
        textAlign: 'center',
        marginTop: 20,
    },
})