import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from './HomeStackNavigator'
import { colors } from '../global/colors'
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Header from '../components/Header'
import CartStackNavigator from './CartStackNavigator'
import OrderStackNavigator from './OrderStackNavigator'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header route={route} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="HomeScreemNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="store"
                  size={24}
                  color={focused ? "black" : colors.teal600}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign
                name="shoppingcart"
                size={24}
                color={focused ? "black" : colors.teal600}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome6
                  name="clipboard-list"
                  size={24}
                  color={focused ? "black" : colors.teal600}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.teal200,
    shadowColor: "black",
    elevation: 4,
    borderRadius: 15,
    height: 60,
  },
});
