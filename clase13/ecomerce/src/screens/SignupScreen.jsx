import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'

const SignupScreen = () => {
        const [email, setEmail] = useState("");
        const [errorMail, setErrorMail] = useState("");
        const [password, setPassword] = useState("");
        const [errorPassword, setErrorPassword] = useState("");
        const [confirmPassword, setconfirmPassword] = useState("");
        const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

        const onSubmit = () => {}

return (
  <View style={styles.main}>
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <InputForm label={"email"} onChange={setEmail} error={errorMail} />
      <InputForm
        label={"password"}
        onChange={setPassword}
        error={errorPassword}
        isSecure={true}
      />
      <InputForm
        label={"confirm password"}
        onChange={setconfirmPassword}
        error={errorConfirmPassword}
        isSecure={true}
      />
      <SubmitButton onPress={onSubmit} title="Send" />
      <Text style={styles.sub}>Already have an account?</Text>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.subLink}>Login</Text>
      </Pressable>
    </View>
  </View>
);
}

export default SignupScreen

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.platinum,
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Josefin",
  },
  sub: {
    fontSize: 14,
    fontFamily: "Josefin",
    color: "black",
  },
  subLink: {
    fontSize: 14,
    fontFamily: "Josefin",
    color: "blue",
  },
});
