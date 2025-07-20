import { Stack } from 'expo-router'
import { ToastProvider } from 'react-native-toast-notifications'
import { AuthProvider } from './providers/auth-providers'
import QueryProvider from './providers/query-provider'
import NotificationProvider from './providers/notification-provider'
import { StripeProvider } from '@stripe/stripe-react-native'
import { ThemeProvider } from './providers//theme-provider'
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './providers/theme-provider'; // adjust path as needed

function ThemedStatusBar() {
  const { theme } = useTheme()
  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
}
export default function RootLayout() {
  const { theme } = useTheme();
  return (
    //toast provider installed
    
    <ThemeProvider>
      <ThemedStatusBar />
      <ToastProvider>
        <AuthProvider>
          <QueryProvider>
            <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}>
              <NotificationProvider>
                <Stack>
                  <Stack.Screen name="(shop)" options={{ headerShown: false, title: 'Shop' }} />
                  <Stack.Screen name="auth" options={{ headerShown: false }} />
                  <Stack.Screen name="categories" options={{ headerShown: false }} />
                  <Stack.Screen name="product" options={{ headerShown: false }} />
                  <Stack.Screen name="cart" options={{ presentation: "modal", title: 'Shopping Cart' }} />
                </Stack>
              </NotificationProvider>
            </StripeProvider>
          </QueryProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>

  )
}

