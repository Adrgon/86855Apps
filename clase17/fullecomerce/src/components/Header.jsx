import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const Header = ({route}) => {
  const { height, width } = useWindowDimensions();

  const getTitle = () => {
    switch(route.name) {
      case 'HomeScreemNavigator':
        return 'Tienda Coder';
      case 'Home':
        return 'Tienda Coder';
      case 'ItemListCategory':
        return 'Categoría';
      case 'ItemDetail':
        return 'Detalle del Producto';
      case 'Cart':
        return 'Carrito';
      case 'Orders':
        return 'Mis Pedidos';
      case 'My Profile':
        return 'Mi Perfil';
      default:
        return route.name;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={width > 360 ? styles.text : styles.textSm}>{getTitle()}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: colors.burgundy,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.teal900,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: colors.platinum,
    fontFamily: "Josefin",
    fontSize: 24,
    textShadowColor: colors.teal900,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  textSm: {
    color: colors.platinum,
    fontFamily: "Josefin",
    fontSize: 16,
    textShadowColor: colors.teal900,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
