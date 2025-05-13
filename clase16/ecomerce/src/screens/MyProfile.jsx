import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopServices'
import { useDB } from '../hooks/useDb'
import { clearUser } from '../features/User/userSlice'
const MyProfile = ({navigation}) => {
    const {imageCamera, localId} = useSelector(state => state.auth.value)
    const {data: imageFromBase} = useGetProfileImageQuery(localId)
    const { truncateSessionTable } = useDB();
    const dispatch = useDispatch()
    //console.log(imageCamera);
    //console.log(imageFromBase)


    const launchCamera = () => {
        navigation.navigate("Image Selector");
    }

    const launchLocation = () => {
      navigation.navigate("List Address");
    };
    
    const defaultImage = "../../assets/images/defaultProfile.png"



    const signOut = async () => { 
      try {
        const response = await truncateSessionTable();
        console.log("Session table truncated", response)
        dispatch(clearUser())

      }catch(err){
        console.log(err)
      }
    }
  
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
