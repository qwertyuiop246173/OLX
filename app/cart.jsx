// import { Alert, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { useCartStore } from './store/cart-store'
// import { StatusBar } from 'expo-status-bar'
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { createOrder, createOrderItem } from './api/api';
// import { openStripeCheckout, setupStripePaymentSheet } from './lib/stripe';



// export default function Cart() {
//   const { items, removeItem, incrementItem, decrementItem, getTotalPrice,resetCart } = useCartStore()

//   const { mutateAsync: createSupabaseOrder } = createOrder()
//   const { mutateAsync: createSupabaseOrderItem } = createOrderItem()


//   const handleCheckout = async () => {
//     // Alert.alert("Procedding to Checkout", `Total Amount : $${getTotalPrice()}`) //for admin work
//     const totalPrice = parseFloat(getTotalPrice())
//     try {



//       await setupStripePaymentSheet(Math.floor(totalPrice * 100))
//       const result = await openStripeCheckout()
//       if (!result){
//         Alert.alert("An error occured while processing the payment orYou have cancelled the payment process")
//         return
//       }


//       await createSupabaseOrder({ totalPrice }, {
//         onSuccess: data => {
//           createSupabaseOrderItem(
//             items.map(item => ({
//               orderId: data.id,
//               productId: item.id,
//               quantity: item.quantity,
//             })),
//             {
//               onSuccess: () => {
//                 alert(' Order created successfully')
//                 resetCart()
//               }
//             }
//           )
//         }
//       })
//     }
//     catch (error) {
//       console.error(error)
//       alert("An Error Occured while creating the order")
//     }


//   }




//   const CartItem = ({ item, onRemove, onIncrement, onDecrement }) => {
//     return (
//       <View style={styles.cartItem}>
//         <Image source={{ uri: item.heroImage }} style={styles.itemImage} />
//         < View style={styles.itemDetails}>
//           <Text style={styles.itemTitle}>{item.title}</Text>
//           <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
//           <View style={styles.quantityContainer}>
//             <TouchableOpacity
//               onPress={() => onDecrement(item.id)}
//               style={styles.quantityButton}>
//               <Text style={styles.quantityButtonText}>-</Text>
//             </TouchableOpacity>
//             <Text style={styles.itemQuantity}>{item.quantity}</Text>
//             <TouchableOpacity
//               onPress={() => onIncrement(item.id)}
//               style={styles.quantityButton}>
//               <Text style={styles.quantityButtonText}>+</Text>
//             </TouchableOpacity>

//           </View>
//         </View>
//         <TouchableOpacity
//           onPress={() => onRemove(item.id)}
//           style={styles.removeButton}>
//           <AntDesign name="delete" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     )
//   }




//   return (
//     <View style={styles.container}>
//       <StatusBar style={Platform.OS === 'android' ? 'light' : 'auto'} />

//       <FlatList
//         data={items}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) =>
//         (<CartItem
//           item={item}
//           onIncrement={incrementItem}
//           onDecrement={decrementItem}
//           onRemove={removeItem} />)}
//         contentContainerStyle={styles.cartList}
//       />

//       <View style={styles.footer}>
//         <Text style={styles.totalText}>Total : ${getTotalPrice()}</Text>
//         <TouchableOpacity
//           onPress={handleCheckout}
//           style={styles.checkoutButton}>
//           <Text style={styles.checkoutButtonText}> Checkout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//   },
//   cartList: {
//     paddingVertical: 16,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     padding: 16,
//     borderRadius: 8,
//     backgroundColor: '#f9f9f9',
//   },
//   itemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//   },
//   itemDetails: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   itemPrice: {
//     fontSize: 16,
//     color: '#888',
//     marginBottom: 4,
//   },
//   itemQuantity: {
//     fontSize: 14,
//     color: '#666',
//   },
//   removeButton: {
//     padding: 8,
//     backgroundColor: '#ff5252',
//     borderRadius: 8,
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   footer: {
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     alignItems: 'center',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   checkoutButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 8,
//   },
//   checkoutButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantityButton: {
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     backgroundColor: '#ddd',
//     marginHorizontal: 5,
//   },
//   quantityButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// })

import { Alert, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useCartStore } from './store/cart-store'
import { StatusBar } from 'expo-status-bar'
import AntDesign from '@expo/vector-icons/AntDesign';
import { createOrder, createOrderItem } from './api/api';
import { openStripeCheckout, setupStripePaymentSheet } from './lib/stripe';
import { useTheme } from './providers/theme-provider' // <-- already present
import { Stack } from 'expo-router';

export default function Cart() {
  const { items, removeItem, incrementItem, decrementItem, getTotalPrice, resetCart } = useCartStore()
  const { mutateAsync: createSupabaseOrder } = createOrder()
  const { mutateAsync: createSupabaseOrderItem } = createOrderItem()
  const { theme } = useTheme() // <-- already present

  const handleCheckout = async () => {
    const totalPrice = parseFloat(getTotalPrice())
    try {
      await setupStripePaymentSheet(Math.floor(totalPrice * 100))
      const result = await openStripeCheckout()
      if (!result) {
        Alert.alert("An error occured while processing the payment orYou have cancelled the payment process")
        return
      }
      await createSupabaseOrder({ totalPrice }, {
        onSuccess: data => {
          createSupabaseOrderItem(
            items.map(item => ({
              orderId: data.id,
              productId: item.id,
              quantity: item.quantity,
            })),
            {
              onSuccess: () => {
                alert(' Order created successfully')
                resetCart()
              }
            }
          )
        }
      })
    }
    catch (error) {
      console.error(error)
      alert("An Error Occured while creating the order")
    }
  }

  // --- changed: pass theme to CartItem and use theme for container ---
  const CartItem = ({ item, onRemove, onIncrement, onDecrement, theme }) => {
    return (
      <View style={[
        styles.cartItem,
        theme === 'dark' && styles.cartItemDark // <-- changed
      ]}>
        <Image source={{ uri: item.heroImage }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={[
            styles.itemTitle,
            theme === 'dark' && styles.itemTitleDark // <-- changed
          ]}>{item.title}</Text>
          <Text style={[
            styles.itemPrice,
            theme === 'dark' && styles.itemPriceDark // <-- changed
          ]}>${item.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => onDecrement(item.id)}
              style={[
                styles.quantityButton,
                theme === 'dark' && styles.quantityButtonDark // <-- changed
              ]}>
              <Text style={[
                styles.quantityButtonText,
                theme === 'dark' && styles.quantityButtonTextDark // <-- changed
              ]}>-</Text>
            </TouchableOpacity>
            <Text style={[
              styles.itemQuantity,
              theme === 'dark' && styles.itemQuantityDark // <-- changed
            ]}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => onIncrement(item.id)}
              style={[
                styles.quantityButton,
                theme === 'dark' && styles.quantityButtonDark // <-- changed
              ]}>
              <Text style={[
                styles.quantityButtonText,
                theme === 'dark' && styles.quantityButtonTextDark // <-- changed
              ]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          style={[
            styles.removeButton,
            theme === 'dark' && styles.removeButtonDark // <-- changed
          ]}>
          <AntDesign name="delete" size={24} color={theme === 'dark' ? "#fff" : "black"} /> {/* changed */}
        </TouchableOpacity>
      </View>
    )
  }
  // --- end changed ---

  return (
    // --- changed: themed container ---
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <StatusBar style={Platform.OS === 'android' ? 'light' : 'auto'} />
      <Stack.Screen
        options={{
          title: 'Shopping Cart',
          headerStyle: {
            backgroundColor: theme === 'dark' ? '#222' : '#fff', // <-- changed
          },
          headerTintColor: theme === 'dark' ? '#fff' : '#222',   // <-- changed
        }}
      />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />   {/* <-- changed */}
      {items.length === 0 ? (
        // --- CHANGED: Show empty cart message with themed background ---
        <View style={[styles.emptyContainer, theme === 'dark' && styles.containerDark]}>
          <Text style={[styles.emptyText, theme === 'dark' && { color: '#fff' }]}>
            Your cart is empty.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) =>
            (<CartItem
              item={item}
              onIncrement={incrementItem}
              onDecrement={decrementItem}
              onRemove={removeItem}
              theme={theme}
            />)}
            contentContainerStyle={styles.cartList}
          />

          <View style={[styles.footer, theme === 'dark' && styles.footerDark]}>
            <Text style={[styles.totalText, theme === 'dark' && styles.totalTextDark]}>Total : ${getTotalPrice()}</Text>
            <TouchableOpacity
              onPress={handleCheckout}
              style={[styles.checkoutButton, theme === 'dark' && styles.checkoutButtonDark]}>
              <Text style={[styles.checkoutButtonText, theme === 'dark' && styles.checkoutButtonTextDark]}> Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
    // --- end changed ---
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  containerDark: { // --- added
    backgroundColor: '#222',
  },
  cartList: {
    paddingVertical: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  cartItemDark: { // --- added
    backgroundColor: '#333',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
  },
  itemTitleDark: { // --- added
    color: '#fff',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  itemPriceDark: { // --- added
    color: '#ccc',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemQuantityDark: { // --- added
    color: '#fff',
  },
  removeButton: {
    padding: 8,
    backgroundColor: '#ff5252',
    borderRadius: 8,
  },
  removeButtonDark: { // --- added
    backgroundColor: '#b71c1c',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  footerDark: { // --- added
    backgroundColor: '#222',
    borderColor: '#444',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  totalTextDark: { // --- added
    color: '#fff',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  checkoutButtonDark: { // --- added
    backgroundColor: '#388e3c',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButtonTextDark: { // --- added
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  quantityButtonDark: { // --- added
    backgroundColor: '#555',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  quantityButtonTextDark: { // --- added
    color: '#fff',
  },
  emptyContainer: { // --- added
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: { // --- added
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    justifyContent: 'center',
  },
})