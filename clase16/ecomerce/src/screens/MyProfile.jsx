import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopServices'

const MyProfile = ({navigation}) => {
    const {imageCamera, localId} = useSelector(state => state.auth.value)
    const {data: imageFromBase} = useGetProfileImageQuery(localId)
    //console.log(imageCamera);
    //console.log(imageFromBase)


    const launchCamera = () => {
        navigation.navigate("Image Selector");
    }

    const launchLocation = () => {
      navigation.navigate("List Address");
    };
    
    const defaultImage = "../../assets/images/defaultProfile.png"



    const signOut = () => { }
  
  return (
    <View style={styles.container}>
      {imageFromBase || imageCamera ? (
        <Image
          source={{ uri: imageFromBase?.image || imageCamera }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={require(defaultImage)}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Button title="Add picture Profile" onPress={launchCamera} />
      <Button title="My address" onPress={launchLocation} />
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

export default MyProfile

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 15,
    alignItems: 'center',
    justifyContent: "flex-start"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
