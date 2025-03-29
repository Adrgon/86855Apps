import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useWindowDimensions } from 'react-native';

const Basicos = () => {
    const { height, width, scale, fontScale} = useWindowDimensions()

  return (
    <View
      style={{
        backgroundColor: "#192265",
        padding: 20,
      }}
    >
      <Text style={styles.basicText}>Estilos Basicos</Text>
      <Text style={styles.bodyText}>Es es un componente</Text>
      <Text style={styles.bodyText}>
        Dimensiones de la pantalla son: {width}x{height} - scale: {scale} - font
        scale: {fontScale}
      </Text>
      <View
        style={{
          width: "50%",
          height: "50%",
          backgroundColor: "#5b5a78",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: width / 2 - 25,
          width: 50,
          height: 50,
          backgroundColor: '#2620d4'
        }}
      />
      ç
    </View>
  );
}

export default Basicos

const styles = StyleSheet.create({
  basicText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
  bodyText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});


// Flexbox por defecto 
// flexDireccion column por defecto
// valores de las propiedades son cadenas de caracteres salvo que sea una unidad de medida
// las unidades de medida se representan con numeros
// podemos utilizar herramientas para calcular el tamaño de pantalla. 
