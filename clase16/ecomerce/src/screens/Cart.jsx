import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
//import CartData from "../data/cart.json"
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/shopServices'

const CartScreen = () => {
  const {items: CartData, total} = useSelector((state) => state.cart.value)
  const {localId} = useSelector(state => state.auth.value)
  const [triggerPostOrder, result] = usePostOrderMutation()

  const onConfirmOrder = () => {
    triggerPostOrder({ items: CartData, user: localId, total });
    // limpiar el carrito una vez guardada la orden
  }
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
        <Pressable onPress={onConfirmOrder} >
          <Text> Checkout </Text>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})
