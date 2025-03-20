import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';

const productsExample = [
  { id: 1, value: "Mate" },
  { id: 2, value: "Cafe" },
  { id: 3, value: "Harina" },
  { id: 4, value: "Palmitos" },
  { id: 5, value: "Yerba" },
  { id: 6, value: "Mermelada" },
  { id: 7, value: "Cacao" },
  { id: 8, value: "Picadillo" },
  { id: 9, value: "Pate" },
  { id: 10, value: "Caballa" },
  { id: 11, value: "Arroz" },
  { id: 12, value: "Arvejas" },
  { id: 13, value: "Sadinas" },
  { id: 14, value: "Atun" },
  { id: 15, value: "Choclo" },
  { id: 16, value: "Lentejas" },
];


export default function App() {
/*   const [uno, dos] = useState("");
  console.log(uno) // valor del estado la primera vez cadena vacia
  console.log(dos) // funcion para cambiar el valor del estado  */

  const [textItem, setTextItem] = useState("")
  const [itemList, setItemList] = useState(productsExample)

  const handleChangeText = (text) => {
    console.log(text)
    setTextItem(text) 
  }

  const addItem = () => {
    console.log("add item")
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={textItem}
          onChangeText={handleChangeText}
          style={styles.input}
        />
        <Button title="Agregar" color="#5555ff" onPress={addItem} />
      </View>
      <ScrollView style={styles.productsContainer}>
        {itemList.map((item) => (
          <View style={styles.product} key={item.id}>
            <Text style={styles.productText}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#888",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: 24,
    width: 250,
  },
  productsContainer: {
    marginTop: 15,
    paddingVertical: 10,
    width: "90%",
  },
  product: {
    alignItems: "center",
    backgroundColor: "#cccccc",
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
    paddingVertical: 15,
  },
  productText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
