import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemDetail = () => {
  return (
    <>
      <Button title='Volver'/>
      <View style={styles.mainContainer}>
        <Image style={styles.image}/>
        <View style={styles.textContainer}>
          <Text>Titulo</Text>
          <Text>Descripcion</Text>
          <Text style={ style.price }>Precio</Text>
          <Button title="Add to cart"/>
        </View>
      </View>
    </>
  );
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  image: { width: "100%", height: 250 },
  textContainer: { flexDirection: "column" },
  price: { textAlign: "right", width: "100%" },
});
