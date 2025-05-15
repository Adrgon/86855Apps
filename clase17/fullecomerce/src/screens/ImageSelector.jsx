import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePiker from "expo-image-picker";

import { useDispatch, useSelector } from 'react-redux'
import { setCameraImage } from '../features/User/userSlice';
import { colors } from '../global/colors'
import { usePostProfileImageMutation } from '../services/shopServices'

const ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null)
    const [triggerPostImage, result] = usePostProfileImageMutation()
    const {localId} = useSelector(state => state.auth.value)
    const dispatch = useDispatch()

    
    
    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePiker.requestCameraPermissionsAsync()
        return granted
    }

    const pickImage = async () => {
        try{
            const permissionCamera = await verifyCameraPermissions()
            if(permissionCamera) {
                let result = await ImagePiker.launchCameraAsync({
                  mediaTypes: ["images"],
                  allowsEditing: true,
                  aspect: [1, 1],
                  base64: true,
                  quality: 0.2,
                });

                if(!result.canceled){
                    const image = `data:image/jpeg;base64, ${result.assets[0].base64}`
                    //console.log(image)
                    setImage(image)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

const confirmImage = async () => {
        try {
            dispatch(setCameraImage(image))
            triggerPostImage({image, localId})
            navigation.goBack()
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <Image source={{uri: image}} style={styles.image}/>
          <Button title="Take another photo" onPress={pickImage} />
          <Button title="Confirm photo" onPress={confirmImage} />
        </>
      ) : (
        <View style={styles.noPhotoContainer}>
          <Text>No photo to show</Text>
          <Button title="Take a photo" onPress={pickImage} />
        </View>
      )}
    </View>
  );
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    noPhotoContainer: {
        padding: 10,
        gap: 15,
        borderWidth: 2,
        borderColor: colors.platinum,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
})
