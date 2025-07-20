import { FlatList, StyleSheet, Text, View, ListRenderItem, Pressable, ActivityIndicator } from 'react-native'
// import { ORDERS } from '../../../assets/orders'     // commented for admin use
import { Link, Stack } from 'expo-router'
import { Tables } from '../../types/database.type'
import { getMyOrders } from '../../api/api';
import { format } from 'date-fns'
// import{ Order,OrderStatus } from '../../../assets/types/order'  // commented for admin use
import { useTheme } from '../../providers/theme-provider'

export default function Orders() {

  // const statusDisplayText={ //// we changed the syntax here earlier: const statusDisplayText: Record<OrderStatus, string> = {
  //   Pending: 'Pending',
  //   Completed: 'Completed',
  //   Shipped: 'Shipped',                           // commented for admin use
  //   InTransit:'In Transit'
  // }
  const { theme } = useTheme()
  const renderItem: ListRenderItem<Tables<'order'>> = ({ item }) => ( // we changed the syntax here  earlier : const renderItem: ListRenderItem<Order> = ({ item }) => (
    <Link href={`/orders/${item.slug}`} asChild>
      <Pressable style={
        styles.orderContainer}>
        <View style={styles.orderContent}>
          <View style={styles.orderDetailsContainer}>
            <Text style={[styles.orderItem, theme === 'dark' && { color: '#fff' }]}>{item.slug}</Text>
            <Text style={[styles.orderDetails, theme === 'dark' && { color: '#fff' }]}>{item.description}</Text>
            <Text style={[styles.orderDate, theme === 'dark' && { color: '#fff' }]}>
              {format(new Date(item.created_at), 'MMM dd, yyyy')}
            </Text>
          </View>
          <View style={[styles.statusBadge, styles[`statusBadge_${item.status}`]]}>
            {/* <Text style={styles.statusText}>{statusDisplayText[item.status]}</Text>    // commented for admin use */}
            <Text style={[styles.statusText, theme === 'dark' && { color: '#fff' }]}>{item.status.toUpperCase()}</Text>

          </View>
        </View>
      </Pressable>
    </Link>
  )

  const { data: orders, error, isLoading } = getMyOrders()
  if (isLoading) return <ActivityIndicator />;

  if (error || !orders)
    return <Text>Error : {error?.message}</Text>;
  if (!orders.length)
    return (
      <Text
        style={{
          fontSize: 16,
          color: '#555',
          textAlign: 'center',
          padding: 10,
        }}
      >
        No orders created yet
      </Text>
    );

  return (
    <View style={[styles.container,
    theme === 'dark' && { backgroundColor: '#222' }
    ]}>
      <Stack.Screen options={{ title: 'Orders' }} />
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} />
    </View>
  )
}



const styles: { [key: string]: any } = StyleSheet.create({    //  :{[key:string]:any} if you want to use dynamic styles and if not written  styles[`statusBadge_${item.status}`] ]} get an error


  container: {
    flex: 1,
    padding: 16,
  },
  orderContainer: {
    // backgroundColor: '#f8f8f8',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'lightgray',
  },
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetailsContainer: {
    flex: 1,
  },
  orderItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDetails: {
    fontSize: 14,
    color: '#555',
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusBadge_Pending: {
    backgroundColor: '#ffcc00',
  },
  statusBadge_Completed: {
    backgroundColor: '#4caf50',
  },
  statusBadge_Shipped: {
    backgroundColor: '#2196f3',
  },
  statusBadge_InTransit: {
    backgroundColor: '#ff9800',
  },
});