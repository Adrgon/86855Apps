
import { View, Text, StyleSheet } from 'react-native';
import PlatformStyle from './components/PlatformStyle';
import Bienvenidos from './components/bienvenidos/bienvenidos';
//import Condicional from './components/Condicional';
//import Flex from './components/Flex';
//import Basicos from './components/Basicos';



export default function App() {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Bienvenidos />
    </View>
  );
}
