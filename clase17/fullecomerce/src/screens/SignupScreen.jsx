import { StyleSheet, Text, View, Pressable, Animated, useWindowDimensions } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { colors } from '../global/colors';
import InputForm from "../components/inputForm";
import SubmitButton from "../components/submitButton";
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authService';
import { signupSchema } from '../validations/authSchema';
import { setUser } from '../features/User/userSlice';
import Feather from "@expo/vector-icons/Feather";

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const { width, height, scale } = useWindowDimensions();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const dispatch = useDispatch()
  const [triggerSignUp, result] = useSignUpMutation()

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

  useEffect(()=>{
    if(result.isSuccess){
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        })
      );
    }
  },[result])

  const onSubmit = () => {
    try {
      setErrorMail("");
      setErrorPassword("")
      setErrorConfirmPassword("")
      signupSchema.validateSync({email, password, confirmPassword})
      triggerSignUp({ email, password, returnSecureToken: true });
    } catch (err) {
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
          break;
        case "password":
          setErrorPassword(err.message);
          break;
        case "confirmPassword":
          setErrorConfirmPassword(err.message);
          break;
      }
    }
  }

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
          <Feather name="user-plus" size={getDynamicFontSize(40)} color={colors.textHighContrast} />
          <Text style={[styles.title, { fontSize: getDynamicFontSize(28) }]}>
            Crear Cuenta
          </Text>
        </View>
        <InputForm 
          label={"Email"} 
          onChange={setEmail} 
          error={errorMail} 
        />
        <InputForm
          label={"Contraseña"}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"Confirmar Contraseña"}
          onChange={setconfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Registrarse" />
        <View style={styles.footer}>
          <Text style={[styles.sub, { fontSize: getDynamicFontSize(16) }]}>
            ¿Ya tienes una cuenta?
          </Text>
          <Pressable 
            style={({pressed}) => [
              styles.loginButton,
              pressed && styles.loginButtonPressed
            ]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[styles.subLink, { fontSize: getDynamicFontSize(16) }]}>
              Iniciar Sesión
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

export default SignupScreen

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
  loginButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.accentHighContrast,
  },
  loginButtonPressed: {
    backgroundColor: colors.accentMediumContrast,
    transform: [{ scale: 0.95 }],
  },
  subLink: {
    fontFamily: "Josefin",
    color: colors.textHighContrast,
    fontWeight: 'bold',
  },
});
