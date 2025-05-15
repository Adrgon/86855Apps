import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopServices'
import { useSession } from '../hooks/useSession'
import { clearUser } from '../features/User/userSlice'
import { colors } from '../global/colors'
import Card from '../components/Card'

const MyProfile = ({navigation}) => {
    const {imageCamera, localId} = useSelector(state => state.auth.value)
    const {data: imageFromBase} = useGetProfileImageQuery(localId)
    const { truncateSessionTable } = useSession();
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
      <Card style={styles.profileCard}>
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
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={launchCamera}>
            <Text style={styles.buttonText}>Cambiar Foto</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={launchLocation}>
            <Text style={styles.buttonText}>Mis Direcciones</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.signOutButton]} onPress={signOut}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </Pressable>
        </View>
      </Card>
    </View>
  );
}

export default MyProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.teal400,
    padding: 16,
    paddingBottom: 100,
  },
  profileCard: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.teal600,
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: colors.platinum,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    backgroundColor: colors.burgundy,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.platinum,
    fontSize: 18,
    fontFamily: "Josefin",
  },
  signOutButton: {
    marginTop: 8,
    backgroundColor: colors.teal900,
  }
});
