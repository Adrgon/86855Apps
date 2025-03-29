import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Condicional = () => {
    const [condicion, setCondicion] = useState(false)

    const getStyle = () => {
        return [styles.box, {
            backgroundColor: condicion ? 'red' : "blue",
            width: 100,
            height: 100
        }]
    }

  return (
    <View>
      <Button title='cambiar' onPress={() => setCondicion(!condicion)}/>
      <View 
        style={{
            backgroundColor: condicion ? 'red' : "blue",
            width: 100,
            height: 100
        }}
      />
      <View style={getStyle()} />

    </View>
  )
}

export default Condicional

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
    }
})
