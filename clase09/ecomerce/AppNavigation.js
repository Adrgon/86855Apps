import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Inicio from "./src/pantallas/Inicio";
import Nosotros from "./src/pantallas/Nosotros";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Nosotros">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Nosotros" component={Nosotros} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
