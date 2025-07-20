
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from './theme-provider'

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ padding: 10 }}>
      {theme === 'dark' ? (
        <Feather name="sun" size={24} color="#FFA500" />
      ) : (
        <Feather name="moon" size={24} color="#333" />
      )}
    </TouchableOpacity>
  )
}

export default ThemeToggleButton