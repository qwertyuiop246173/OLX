// import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, FlatList } from 'react-native'
// import { Link } from 'expo-router'
// import { FontAwesome } from '@expo/vector-icons'
// // import { CATEGORIES } from '../../assets/categories'
// import { useCartStore } from '../store/cart-store'
// import { supabase } from '../lib/supabase'
// import { Tables } from '../types/database.type'
// import ThemeToggleButton from '../providers/theme-toggle-button'

// const ListHeader = ({categories}:{categories:Tables<'category'>[]}) => {
//     const { getItemCount } = useCartStore() //{getItemCount} why in {}
//     const handleSignOut= async()=>{
//         await supabase.auth.signOut()
//     }
//     return (
//         <View style={styles.headerContainer}>
//             <View style={styles.headerTop}>
//                 <View style={styles.headerLeft}>
//                     <View style={styles.avatarContainer}>
//                         <Image
//                             source={{ uri: 'https://cdn2.downdetector.com/static/uploads/logo/OLX-v1b-small-RGB.png' }}
//                             style={styles.avatarImage} />
//                         <Text style={styles.avatarText}>OLX Karo !!</Text>
//                     </View>
//                 </View>
//                 <View style={styles.headerRight}>
//                     <ThemeToggleButton />
//                     <Link style={styles.cartContainer} href='/cart' asChild>
//                         <Pressable>
//                             {({ pressed }) => (
//                                 <View>
//                                     <FontAwesome name='shopping-cart' size={25} color='gray' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
//                                     <View style={styles.badgeContainer}>
//                                         <Text style={styles.badgeText}>{getItemCount()}</Text>
//                                     </View>
//                                 </View>
//                             )}
//                         </Pressable>
//                     </Link>
//                     <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
//                         <FontAwesome name='sign-out' size={25} color='red' />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <View style={styles.heroContainer}>
//                 <Image
//                     source={require('../../assets/images/hero.png')}
//                     style={styles.heroImage} />
//             </View>
//             <View style={styles.categoriesContainer}>
//                 <Text style={styles.sectionTitle}>Categories</Text>
//                 <FlatList
//                     data={categories}
//                     renderItem={({ item }) => (
//                         <Link asChild href={`/categories/${item.slug}`}>
//                             <Pressable style={styles.category}>
//                                 <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
//                                 <Text style={styles.categoryText}>{item.name}</Text>
//                             </Pressable>
//                         </Link>
//                     )}
//                     keyExtractor={item => item.name}
//                     horizontal
//                     showsHorizontalScrollIndicator={true}
//                 />
//             </View>
//         </View>
//     )
// }

// export default ListHeader

// const styles = StyleSheet.create({
//     headerContainer: {
//         gap: 20,
//     },
//     headerTop: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     headerLeft: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     headerRight: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     avatarContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     avatarImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         marginRight: 10,
//     },
//     avatarText: {
//         fontSize: 16,
//     },
//     cartContainer: {
//         padding: 10,
//     },
//     signOutButton: {
//         padding: 10,
//     },
//     heroContainer: {
//         width: '100%',
//         height: 200,
//     },
//     heroImage: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//         borderRadius: 20,
//     },
//     categoriesContainer: {},
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     category: {
//         width: 100,
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     categoryImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         marginBottom: 8,
//     },
//     categoryText: {},
//     badgeContainer: {
//         position: 'absolute',
//         top: -5,
//         right: 10,
//         backgroundColor: '#1BC464',
//         borderRadius: 12,
//         width: 20,
//         height: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     badgeText: {
//         color: 'white',
//         fontSize: 12,
//         fontWeight: 'bold',
//     }
// })



import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, FlatList } from 'react-native'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { useCartStore } from '../store/cart-store'
import { supabase } from '../lib/supabase'
import { Tables } from '../types/database.type'
import ThemeToggleButton from '../providers/theme-toggle-button'
import { useTheme } from '../providers/theme-provider'
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
const ListHeader = ({ categories }: { categories: Tables<'category'>[] }) => {
  const { getItemCount } = useCartStore()
  const { theme } = useTheme()
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <View style={[styles.headerContainer, theme === 'dark' && { backgroundColor: '#222' }]}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://cdn2.downdetector.com/static/uploads/logo/OLX-v1b-small-RGB.png' }}
              style={styles.avatarImage} />
            <Text style={[styles.avatarText, theme === 'dark' && { color: '#fff' }]}>
              {user?.email ?? 'Guest'}
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <ThemeToggleButton />
          <Link style={styles.cartContainer} href='/cart' asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome name='shopping-cart' size={25} color='gray' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{getItemCount()}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
            <FontAwesome name='sign-out' size={25} color='red' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroContainer}>
        <Image
          source={require('../../assets/images/hero.png')}
          style={styles.heroImage} />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={[styles.sectionTitle, theme === 'dark' && { color: '#fff' }]}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Link asChild href={`/categories/${item.slug}`}>
              <Pressable style={styles.category}>
                <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
                <Text style={[styles.categoryText, theme === 'dark' && { color: '#fff' }]}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={item => item.name}
          horizontal
          showsHorizontalScrollIndicator={true}
        />
      </View>
    </View>
  )
}

export default ListHeader

const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
    backgroundColor: '#fff',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    color: '#222',
  },
  cartContainer: {
    padding: 10,
  },
  signOutButton: {
    padding: 10,
  },
  heroContainer: {
    width: '100%',
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  category: {
    width: 100,
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {
    color: '#222',
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: 10,
    backgroundColor: '#1BC464',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
})