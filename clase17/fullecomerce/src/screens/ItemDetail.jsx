import { Image, StyleSheet, Text, View, useWindowDimensions, ActivityIndicator, Animated, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useGetProductByIdQuery } from '../services/shopServices';
//import allProducts from '../data/products.json';
import { addCartItem } from '../features/Cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../global/colors';

const ItemDetail = ({
  route,
  navigation
}) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const {productId: idSelected} = route.params
  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected);
  console.log(product)

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

  const handleAddCart = () => {
    dispatch(addCartItem({...product, quantity: 1}));
    // Feedback visual al agregar al carrito
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.teal400} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar el producto</Text>
        <Pressable 
          style={({pressed}) => [
            styles.retryButton,
            pressed && styles.retryButtonPressed
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Animated.View style={[
        styles.content,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          flexDirection: isLandscape ? 'row' : 'column',
          padding: isLandscape ? 20 : 16,
        }
      ]}>
        <View style={[
          styles.imageContainer,
          {
            width: isLandscape ? '50%' : '100%',
            marginRight: isLandscape ? 20 : 0,
            marginBottom: isLandscape ? 0 : 20,
          }
        ]}>
          <Image
            source={{ uri: product.images[0] }}
            resizeMode="contain"
            style={
              isLandscape ? styles.imageLandscape : styles.image
            }
            loading="lazy"
            progressiveRenderingEnabled={true}
            fadeDuration={300}
          />
        </View>
        <View style={[
          styles.detailsContainer,
          {
            width: isLandscape ? '50%' : '100%',
            justifyContent: isLandscape ? 'center' : 'flex-start',
          }
        ]}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Pressable 
            style={({pressed}) => [
              styles.addToCartButton,
              pressed && styles.addToCartButtonPressed
            ]}
            onPress={handleAddCart}
          >
            <Text style={styles.addToCartText}>Agregar al carrito</Text>
          </Pressable>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

export default ItemDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.teal900,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: colors.teal800,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: colors.teal200,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageLandscape: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: "Josefin",
    color: colors.platinum,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.platinum,
    marginBottom: 20,
    lineHeight: 24,
  },
  price: {
    fontSize: 24,
    fontFamily: "Josefin",
    color: colors.teal400,
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: colors.teal400,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButtonPressed: {
    backgroundColor: colors.teal200,
  },
  addToCartText: {
    color: colors.teal900,
    fontSize: 16,
    fontFamily: 'Josefin',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.teal900,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.teal900,
    padding: 20,
  },
  errorText: {
    color: colors.error,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.teal400,
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  retryButtonPressed: {
    backgroundColor: colors.teal200,
  },
  retryButtonText: {
    color: colors.teal900,
    fontSize: 16,
    fontFamily: 'Josefin',
    fontWeight: 'bold',
  },
});
