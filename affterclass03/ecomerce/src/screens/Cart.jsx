import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartData from "../data/cart.json"
import CartItem from '../components/CartItem'

const CartScreen = () => {
  const total = 34343.50
  return (
    <View style={styles.contaier}>
      <FlatList 
        data={CartData}
        keyExtractor={product => product.id}
        renderItem={({item})=>{
          return (
            <CartItem 
              cartItem={item}
            />
          )
        }}
      />
      <View style={styles.totalContainer}>
        <Pressable>
          <Text>Checkout</Text>
        </Pressable>
        <Text>Total: ${total}</Text>
      </View>
    </View>
  )
}

export default CartScreen 

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },
  totalContainer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})
