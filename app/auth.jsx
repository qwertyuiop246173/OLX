import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useAuth } from './providers/auth-providers'
import { Redirect } from 'expo-router'
import { supabase } from './lib/supabase'
 
import { useToast } from 'react-native-toast-notifications'



const authSchema = zod.object({
  email: zod.string().email({ message: ' Invalid Email Address' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters long' })
})

export default function auth() {

  const toast = useToast();
  
  const { session }= useAuth()
  if(session) return <Redirect href='/'/>

  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const signIn = async (data) => {
    const { error }= await supabase.auth.signInWithPassword(data)
    if ( error ){
      alert( error.message )
    }else{
      toast.show('Signed in Succesfully',{
        type:'success',
        placement:'top',
        duration:1500
      })
    }
  }
  const signUp = async (data) => {
    const { error }= await supabase.auth.signUp(data)
    if ( error ){
      alert( error.message )
    }else{
      toast.show('Signed Up Succesfully',{
        type:'success',
        placement:'top',
        duration:1500
      })
    }
  }

  return (
    <ImageBackground style={styles.backgroundImage} source={{ uri: 'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Please Authenticate to Continue</Text>

        <Controller
          control={control}
          name='email'
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error }
          }) => (
            <>
              <TextInput placeholder='Enter Email Id'
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor='#aaa'
                autoCapitalize='none'
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error }
          }) => (
            <>
              <TextInput placeholder='Enter Password'
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                placeholderTextColor='#aaa'
                autoCapitalize='none'
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit(signIn)} disabled={formState.isSubmitting}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSubmit(signUp)} disabled={formState.isSubmitting}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,   ///what use of this ???
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 32,
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#6a1b9a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '90%',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
  },
  signUpButtonText: {
    color: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'left',
    width: '90%',
  },
})