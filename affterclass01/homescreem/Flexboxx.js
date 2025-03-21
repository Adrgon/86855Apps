import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Red from './components/Red';
import Blue from './components/Blue';
import Green from './components/Green';
import { version } from 'react';

export default function App() {


  return (
    <View style={styles.container}>
      <View style={styles.horizontal}>
        <Red />
        <Blue />
        <Green />
      </View>
      <View >
        <Red />
        <Blue />
        <Green />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    marginVertical: 10,
  },
});
