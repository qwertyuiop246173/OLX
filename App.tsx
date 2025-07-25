import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from 'firebase/app'; // Use this for Expo managed workflow

const firebaseConfig = {
  apiKey: "AIzaSyAwJOIp2sDPvlkSoWkrK0OW7qOZPE8wlAk",
  authDomain: "apps-14652.firebaseapp.com",
  projectId: "apps-14652",
  storageBucket: "apps-14652.appspot.com",
  messagingSenderId: "493840062416",
  appId: "1:493840062416:android:b73cd738251bcaab084bd5"
};

initializeApp(firebaseConfig);
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});