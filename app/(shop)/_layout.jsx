import { Redirect, Tabs } from 'expo-router'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import { useAuth } from '../providers/auth-providers';
import { useTheme } from '../providers/theme-provider'
// function TabBarIcon(props:{
//   name:React.ComponentProps<typeof FontAwesome>['name'] // changes due to this line i have to change the file extension to .tsx
//   color: string
// }){
//   return <FontAwesome size ={24} {...props} style={{color:'#1BC464'}}/>
// }

function TabBarIcon(props) {
  return <FontAwesome size={24} {...props} />;
}
const TabsLayout = () => {
  const { theme } = useTheme()
  const { session, mounting } = useAuth() ///Auth Provider
  if (mounting) return <ActivityIndicator />
  if (!session) return <Redirect href='/auth' />


  return (
    <SafeAreaView style={[styles.safeArea,
    theme === 'dark' && { backgroundColor: '#222' }]}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#1BC464',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
            backgroundColor: theme === 'dark' ? '#222' : '#fff'
          },
          headerShown: false,
        }}>
        <Tabs.Screen name="index" options={
          {
            title: 'Shop',
            tabBarIcon(props) {
              return <TabBarIcon {...props} name='shopping-cart' />
            }
          }} />
        <Tabs.Screen name="orders" options={
          {
            title: 'Orders',
            headerShown: false,
            tabBarIcon(props) {
              return <TabBarIcon {...props} name='book' />
            }
          }} />
      </Tabs>
    </SafeAreaView>
  )
}
export default TabsLayout

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
})

