import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import products from "../data/products.json"
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'

const ItemListCategory = ({
  categorySelected = "",
  setCategorySelected = () => {},
  setItemIdSelected = () => {},
}) => {
  const [keyWord, setKeyword] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [error, setError] = useState("");

  //console.log(categorySelected)

  useEffect(() => {
    const regex = /\d/;
    const hasDigits = regex.test(keyWord);
    //console.log(hasDigits);
    if (hasDigits) {
      setError("No se permiten numeros");
      return;
    }
    const productsPrefiltered = products.filter(
      (product) => product.category === categorySelected
    );
    //console.log(productsPrefiltered) // todos los de la categoria
    const productsFilter = productsPrefiltered.filter((product) =>
      product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
    );
    //console.log(productsFilter)
    setProductsFiltered(productsFilter);
    setError("");
  }, [keyWord, categorySelected]);
  return (
    <View>
      <Search
        error={error}
        onSearch={setKeyword}
        goBack={() => setCategorySelected("")}
      />
      <FlatList
        data={productsFiltered}
        renderItem={({ item }) => (
          <ProductItem product={item} setItemIdSelected={setItemIdSelected} />
        )}
        keyExtractor={(producto) => producto.id}
      />
    </View>
  );
};

export default ItemListCategory

const styles = StyleSheet.create({})
