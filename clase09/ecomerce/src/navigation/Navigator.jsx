
import React, {useState} from 'react'

import Home from "../screens/Home";
import ItemListCategory from "../screens/ItemListCategory";
import ItemDetail from "../screens/ItemDetail";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen component={Home} name="Home" />      
        <Stack.Screen component={ItemListCategory} name="ItemListCategory" />
        <Stack.Screen component={ItemDetail} name="ItemDetail" /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator
