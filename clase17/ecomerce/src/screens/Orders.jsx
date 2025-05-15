import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
//import OrderData from '../data/orders.json'
import OrderItem from '../components/OrderItem'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../services/shopServices'

const OrdersScreen = () => {
  const {localId} = useSelector( state => state.auth.value)
  const {data: orders, isSuccess} = useGetOrdersQuery()
  const [ordersFiltered, setOrdersFiltered] = useState()
  console.log(orders)
  useEffect(()=>{
    if(isSuccess){
      const responseTransformed = Object.values(orders);
      const ordersToFilter = responseTransformed.filter(
        (order) => order.user === localId
      );
        setOrdersFiltered(ordersToFilter);
    }
  }, [orders, isSuccess, localId])
  console.log(ordersFiltered)

  return (
    <View>
      <FlatList
        data={ordersFiltered}
        renderItem={({ item }) => {
          return <OrderItem order={item} />;
        }}
      />
    </View>
  );
}

export default OrdersScreen

const styles = StyleSheet.create({})
