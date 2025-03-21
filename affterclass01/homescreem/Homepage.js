
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function App() {


  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.banner} source={require("./assets/bg.jpg")} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Vengadores</Text>
      </View>

      <ScrollView horizontal>
        <View>
          <Image style={styles.film} source={require("./assets/movie3.jpg")} />
        </View>
        <View>
          <Image style={styles.film} source={require("./assets/movie3.jpg")} />
        </View>
        <View>
          <Image style={styles.film} source={require("./assets/movie3.jpg")} />
        </View>
        <View>
          <Image style={styles.film} source={require("./assets/movie3.jpg")} />
        </View>
        <View>
          <Image style={styles.film} source={require("./assets/movie3.jpg")} />
        </View>
      </ScrollView>

      <Text style={styles.title}> Avengers Orginales </Text>

      <View style={styles.listado}>
        <View style={styles.listadoItem}>
          <Image
            style={styles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View style={styles.listadoItem}>
          <Image
            style={styles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View style={styles.listadoItem}>
          <Image
            style={styles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View style={styles.listadoItem}>
          <Image
            style={styles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>
      </View>

      <Text style={styles.title}> Peliculas </Text>

      <View >
        <View >
          <Image
            style={styles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View >
          <Image
            style={styles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View >
          <Image
            style={styles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View >
          <Image
            style={styles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    height: 250
  },
  container: {
    marginHorizontal: 10
  }, 
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
  },
  film: {
    width: 250,
    height: 300,
    marginRight: 10
  }, 
  listado: {
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  listadoItem: {
    flexBasis: "48%",
  },
  character: {
    width: "100%",
    height: 200,
    marginVertical: 8
  },
});
