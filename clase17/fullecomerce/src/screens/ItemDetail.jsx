import { Image, StyleSheet, Text, View, useWindowDimensions, ActivityIndicator, Animated, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useGetProductByIdQuery } from '../services/shopServices';
//import allProducts from '../data/products.json';
import { addCartItem } from '../features/Cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../global/colors';
import Feather from "@expo/vector-icons/Feather";

const ItemDetail = ({
  route,
  navigation
}) => {
  const dispatch = useDispatch();
  const { width, height, scale } = useWindowDimensions();
  const isLandscape = width > height;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Función para calcular tamaños de texto dinámicos
  const getDynamicFontSize = (baseSize) => {
    const scaleFactor = Math.min(scale, 1.5); // Limitar el factor de escala a 1.5
    return Math.round(baseSize * scaleFactor);
  };

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
        <ActivityIndicator size="large" color={colors.accentHighContrast} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { fontSize: getDynamicFontSize(18) }]}>
          Error al cargar el producto
        </Text>
        <Pressable 
          style={({pressed}) => [
            styles.retryButton,
            pressed && styles.retryButtonPressed
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.retryButtonText, { fontSize: getDynamicFontSize(16) }]}>
            Reintentar
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Pressable 
          style={({pressed}) => [
            styles.backButton,
            pressed && styles.backButtonPressed
          ]}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={getDynamicFontSize(24)} color={colors.textHighContrast} />
        </Pressable>
        <Text style={[styles.headerTitle, { fontSize: getDynamicFontSize(20) }]}>
          Detalle del Producto
        </Text>
      </View>
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
          <Text style={[styles.title, { fontSize: getDynamicFontSize(28) }]}>
            {product.title}
          </Text>
          <Text style={[styles.description, { fontSize: getDynamicFontSize(16) }]}>
            {product.description}
          </Text>
          <Text style={[styles.price, { fontSize: getDynamicFontSize(24) }]}>
            ${product.price}
          </Text>
          <Pressable 
            style={({pressed}) => [
              styles.addToCartButton,
              pressed && styles.addToCartButtonPressed
            ]}
            onPress={handleAddCart}
          >
            <Text style={[styles.addToCartText, { fontSize: getDynamicFontSize(16) }]}>
              Agregar al carrito
            </Text>
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
    backgroundColor: colors.backgroundHighContrast,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.backgroundMediumContrast,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.accentHighContrast,
    marginRight: 16,
  },
  backButtonPressed: {
    backgroundColor: colors.accentMediumContrast,
    transform: [{ scale: 0.95 }],
  },
  headerTitle: {
    fontFamily: "Josefin",
    color: colors.textHighContrast,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: colors.backgroundMediumContrast,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: colors.accentLowContrast,
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
    fontFamily: "Josefin",
    color: colors.textHighContrast,
    marginBottom: 12,
  },
  description: {
    color: colors.textMediumContrast,
    marginBottom: 20,
    lineHeight: 24,
  },
  price: {
    fontFamily: "Josefin",
    color: colors.accentHighContrast,
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: colors.accentHighContrast,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButtonPressed: {
    backgroundColor: colors.accentMediumContrast,
  },
  addToCartText: {
    color: colors.textHighContrast,
    fontFamily: 'Josefin',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundHighContrast,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundHighContrast,
    padding: 20,
  },
  errorText: {
    color: colors.error,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.accentHighContrast,
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  retryButtonPressed: {
    backgroundColor: colors.accentMediumContrast,
  },
  retryButtonText: {
    color: colors.textHighContrast,
    fontFamily: 'Josefin',
    fontWeight: 'bold',
  },
});
