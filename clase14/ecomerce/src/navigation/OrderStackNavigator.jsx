import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrdersScreen from '../screens/Orders'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
    </Stack.Navigator>
  )
}

export default OrderStackNavigator

const styles = StyleSheet.create({})
