import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetProductByIdQuery } from '../services/shopServices';
//import allProducts from '../data/products.json';
import { addCartItem } from '../features/Cart/cartSlice';
import { useDispatch } from 'react-redux';

const ItemDetail = ({
  route,
  navigation
}) => {

  const dispatch = useDispatch();
  const [orientation, setOrientation] = useState("portrait");
  const {width, height} = useWindowDimensions();


  const {productId: idSelected} = route.params
  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected);
  console.log(product)
  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

  const hadleAddCart = () => {
    // enviar el producto al la porcion de estado del cart
    dispatch(addCartItem({...product, quantity: 1}))
  }

  return (
    <>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Image
            source={{ uri: product.images[0] }}
            resizeMode="contain"
            style={
              orientation === "portrait" ? styles.image : styles.imageLandscape
            }
          />
          <View
            style={
              orientation === "portrait"
                ? styles.textContainer
                : styles.textContainerLandscape
            }
          >
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>{product.price}</Text>
            <Button title="Add to cart" onPress={hadleAddCart}/>
          </View>
        </View>
      ) : null}
    </>
  );
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },
  textContainer: { flexDirection: "column" },
  textContainerLandscape: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 10,
  },
  price: { textAlign: "right", width: "100%" },
});
