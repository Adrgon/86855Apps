import { StyleSheet, View } from 'react-native';
import { colors } from './src/global/colors';
import Header from './src/components/Header';
import Home from './src/screens/Home';
import ItemListCategory from './src/screens/ItemListCategory';
import ItemDetail from './src/screens/ItemDetail';


export default function App() {

  return (
    <View style={styles.container}>
      <Header title={"Titulo de la Aplicacion"} />
      <Home />
      <ItemListCategory />
      <ItemDetail />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: colors.secondary
  },
});
