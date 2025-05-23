import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="characters" />
      <Tabs.Screen name="planets" />
    </Tabs>
  );
}

export default _layout
