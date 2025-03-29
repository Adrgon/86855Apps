import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Flex = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 10,
      }}
    >
      <View
        style={{
          flex: 2,
          backgroundColor: "purple",
        }}
      >
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: 'teal',
            alignSelf: 'center'
        }}>
          <Text style={{ color: "white" }}>
            Vamos a poner un texto un poco largo para ver si funcionamiento
            dentro del contenedor prestablecido
          </Text>
{/*           <Text style={{ color: "white" }}>
            Vamos a poner un texto un poco largo para ver si funcionamiento
            dentro del contenedor prestablecido
          </Text> */}
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: "red" }} />
      <View style={{ flex: 1, backgroundColor: "blue" }} />
      <View style={{ flex: 1, backgroundColor: "green" }} />
    </View>
  );
}

export default Flex
