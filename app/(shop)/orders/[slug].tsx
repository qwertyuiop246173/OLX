import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { getMyOrder } from '../../api/api'
import { format } from 'date-fns'
import { useTheme } from '../../providers/theme-provider'

const OrderDetails = () => {
    const { slug } = useLocalSearchParams<{ slug: string }>()
    const { theme } = useTheme()
    // const order = ORDERS.find(order => order.slug === slug) // commented out for admin use

    const { data: order, error, isLoading } = getMyOrder(slug);

    if (isLoading) return <ActivityIndicator />;

    if (error || !order) return <Text>Error: {error?.message}</Text>;

    // if (!order) return <Redirect href='/404' /> // commented out for admin use

    const orderItems = order.order_items.map((orderItem: any) => {
        return {
            id: orderItem.id,
            title: orderItem.products.title,         //added for admin use this all
            heroImage: orderItem.products.heroImage,
            price: orderItem.products.price,
            quantity: orderItem.quantity,
        };
    });

    return (
        <View style={[styles.container, theme === 'dark' && { backgroundColor: '#222' }]}>
            <Stack.Screen options={{ title: `${order.slug}` }} />
            <Text style={[styles.item, theme === 'dark' && { color: '#fff' }]}>{order.slug}</Text>
            <Text style={[styles.details, theme === 'dark' && { color: '#fff' }]}>{order.description}</Text>
            <View style={[styles.statusBadge, styles[`statusBadge_${order.status}`], theme === 'dark' && { backgroundColor: '#222' }]}>
                <Text style={[styles.statusText, theme === 'dark' && { color: '#fff' }]}>{order.status}</Text>
            </View>
            <Text style={[styles.date, theme === 'dark' && { color: '#fff' }]}>
                {format(new Date(order.created_at), 'MMM dd, yyyy')}
            </Text>
            <Text style={[styles.itemsTitle, theme === 'dark' && { color: '#fff' }]}>Order Details:</Text>
            <FlatList
                data={orderItems} //why order.item
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[
                        styles.orderItem,
                        {
                            borderWidth: 0.2,
                            borderColor: theme === 'dark' ? 'lightgray' : '#ccc', // <-- boundary changes with theme
                            backgroundColor: theme === 'dark' ? '#171515' : '#f8f8f8'
                        }
                    ]}>
                        <Image source={{ uri: item.heroImage }} style={styles.heroImage} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={[styles.itemName, theme === 'dark' && { color: '#fff' }]}>{item.title}</Text>
                            <Text style={[styles.itemPrice, theme === 'dark' && { color: '#fff' }]}>Price: ${item.price}</Text>
                        </View>
                    </View>
                )
                } />
            <View>
                <Text style={[styles.totalItems, theme === 'dark' && { color: '#fff' }]}>{orderItems.length} items</Text>
                <Text style={[styles.totalPrice, theme === 'dark' && { color: '#fff' }]}>Total: ${orderItems.reduce((total, item) => total + item.price * item.quantity, 0)}</Text>
            </View>

        </View>
    )
}

export default OrderDetails

const styles: { [key: string]: any } = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    item: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    details: {
        fontSize: 16,
        marginBottom: 16,
    },
    statusBadge: {
        padding: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    statusBadge_Pending: {
        backgroundColor: 'orange',
    },
    statusBadge_Completed: {
        backgroundColor: 'green',
    },
    statusBadge_Shipped: {
        backgroundColor: 'blue',
    },
    statusBadge_InTransit: {
        backgroundColor: 'purple',
    },
    statusText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: '#555',
        marginTop: 16,
    },
    itemsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    heroImage: {
        width: '30%',
        height: 90,
        borderRadius: 10,
    },
    itemInfo: {},
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        marginTop: 4,
    },
    totalItems: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
    }
})