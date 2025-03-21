
import { Text, View, Image, ScrollView } from 'react-native';

import { globalStyles } from './styles/global';

export default function App() {


  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        <Image style={globalStyles.banner} source={require("./assets/bg.jpg")} />
      </View>

      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Vengadores</Text>
      </View>

      <ScrollView horizontal>
        <View>
          <Image style={globalStyles.film} source={require("./assets/movie3.jpg")} />
        </View>
        <View>
          <Image style={globalStyles.film} source={require("./assets/movie3.jpg")} />
        </View>
        <View>
          <Image style={globalStyles.film} source={require("./assets/movie3.jpg")} />
        </View>
        <View>
          <Image style={globalStyles.film} source={require("./assets/movie3.jpg")} />
        </View>
        <View>
          <Image style={globalStyles.film} source={require("./assets/movie3.jpg")} />
        </View>
      </ScrollView>

      <Text style={globalStyles.title}> Avengers Orginales </Text>

      <View style={globalStyles.listado}>
        <View style={globalStyles.listadoItem}>
          <Image
            style={globalStyles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View style={globalStyles.listadoItem}>
          <Image
            style={globalStyles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View style={globalStyles.listadoItem}>
          <Image
            style={globalStyles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View style={globalStyles.listadoItem}>
          <Image
            style={globalStyles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>
      </View>

      <Text style={globalStyles.title}> Peliculas </Text>

      <View >
        <View >
          <Image
            style={globalStyles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View >
          <Image
            style={globalStyles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View >
          <Image
            style={globalStyles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>

        <View >
          <Image
            style={globalStyles.character}
            source={require("./assets/movie3.jpg")}
          />
        </View>
      </View>
    </ScrollView>
  );
}
