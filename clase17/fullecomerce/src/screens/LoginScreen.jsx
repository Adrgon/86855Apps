import { StyleSheet, Text, View, Pressable, Animated, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useRef } from "react";
import { colors } from '../global/colors'
import InputForm from "../components/inputForm";
import SubmitButton from "../components/submitButton";
import { useSignInMutation } from '../services/authService';
import { setUser} from "../features/User/userSlice"
import { useDispatch } from "react-redux";
import { useSession } from '../hooks/useSession';
import Feather from "@expo/vector-icons/Feather";

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [triggerSignIn, result] = useSignInMutation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { width, height, scale } = useWindowDimensions();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const {insertSession} = useSession()

  // Función para calcular tamaños de texto dinámicos
  const getDynamicFontSize = (baseSize) => {
    const scaleFactor = Math.min(scale, 1.5);
    return Math.round(baseSize * scaleFactor);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  useEffect(() => {
    if (result.isSuccess) {
      (async ()=>{
        try {
          await insertSession({
            localId: result.data.localId,
            email: result.data.email,
            token: result.data.idToken,
          })
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          );    
        }catch(err){
          console.log(err)
        }
      })()
    }
  }, [result]); 

  const onSubmit = () => {
    triggerSignIn({ email, password });
  }; 

  return (
    <View style={styles.main}>
      <Animated.View style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        <View style={styles.header}>
          <Feather name="user" size={getDynamicFontSize(40)} color={colors.textHighContrast} />
          <Text style={[styles.title, { fontSize: getDynamicFontSize(28) }]}>
            Bienvenido
          </Text>
        </View>
        <InputForm 
          label={"Email"} 
          onChange={setEmail} 
          error={""} 
        />
        <InputForm
          label={"Contraseña"}
          onChange={setPassword}
          error={""}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Iniciar Sesión" />
        <View style={styles.footer}>
          <Text style={[styles.sub, { fontSize: getDynamicFontSize(16) }]}>
            ¿No tienes una cuenta?
          </Text>
          <Pressable 
            style={({pressed}) => [
              styles.signupButton,
              pressed && styles.signupButtonPressed
            ]}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={[styles.subLink, { fontSize: getDynamicFontSize(16) }]}>
              Registrarse
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

export default LoginScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundHighContrast,
  },
  container: {
    width: "90%",
    maxWidth: 400,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundMediumContrast,
    gap: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    elevation: 5,
    shadowColor: colors.accentLowContrast,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: "Josefin",
    color: colors.textHighContrast,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  sub: {
    fontFamily: "Josefin",
    color: colors.textMediumContrast,
  },
  signupButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.accentHighContrast,
  },
  signupButtonPressed: {
    backgroundColor: colors.accentMediumContrast,
    transform: [{ scale: 0.95 }],
  },
  subLink: {
    fontFamily: "Josefin",
    color: colors.textHighContrast,
    fontWeight: 'bold',
  },
});
