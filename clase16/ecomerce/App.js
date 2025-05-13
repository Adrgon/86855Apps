import { colors } from "./src/global/colors";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./src/store";
import { useEffect } from "react";
import { useDB } from "./src/hooks/useDb";

const App = () => {
  const {initDB} = useDB()
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require("./assets/JosefinSans-Regular.ttf"),
    PlayFair: require("./assets/PlayfairDisplay-VariableFont_wght.ttf"),
  });

  useEffect(()=>{
    initDB()
  }, [])

  if (!fontsLoaded || fontError) {
    return null;
  }

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.teal200,
  },
});

export default App;
