import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { colors } from "../global/colors";

const AddressItem = ({ location, navigation }) => {
  const onChangeLocation = () => {
    navigation.navigate("Location Selector");
  };

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{location.address}</Text>
      </View>
      <Pressable style={styles.button} onPress={onChangeLocation}>
        <Entypo name="location" size={24} color={colors.platinum} />
        <Text style={styles.buttonText}>Cambiar</Text>
      </Pressable>
    </View>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: colors.teal600,
    padding: 16,
    margin: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: colors.teal900,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  text: {
    fontFamily: "Josefin",
    fontSize: 18,
    color: colors.platinum,
    lineHeight: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.teal400,
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  buttonText: {
    fontFamily: "Josefin",
    fontSize: 16,
    color: colors.platinum,
  },
});
