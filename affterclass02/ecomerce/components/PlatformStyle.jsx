import { StyleSheet, Text, View, Platform, PlatformColor } from 'react-native'
import React from 'react'

const PlatformStyle = () => {
  return (
    <View>
      <Text style={styles.label}>PlatformStyle</Text>
      <View style={styles.platformBackground}/>
    </View>
  )
}

export default PlatformStyle

const styles = StyleSheet.create({
    label: {
        ...Platform.select({
            ios: {
                color: 'blue',
            },
            android: {
                color: 'green',
            },
            web: {
                color: 'red',
            }
        })
    },
    platformBackground: {
       ...Platform.select({
        web: {
            backgroundColor: PlatformColor('systemBlue'),
        },
        ios: {
            backgroundColor: PlatformColor('systemIndigo')
        }, 
        android: {
            backgroundColor: PlatformColor('@android:color/system_accent3_900')
        }
       }),
        width: 100,
        height: 100
    }
})
