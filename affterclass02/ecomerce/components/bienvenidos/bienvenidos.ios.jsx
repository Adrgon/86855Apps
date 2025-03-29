import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Bienvenidos = () => {
  return (
    <View>
      <Text style={styles.texto}>Bienvenidos IOS</Text>
    </View>
  )
}

export default Bienvenidos

const styles = StyleSheet.create({
    texto: {
        color: 'red'
    }
})
