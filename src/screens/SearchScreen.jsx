import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import RestaurantCard from "../components/RestaurantCard";

const SearchScreen = () => {
  const [term, searchTeam] = useState("");

  const [searchApi, results, errorMessage, isLoading] = useResults();

  if (isLoading)
    return (
      <View style={styles.loading}>
        <Text>Loading please wait ...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => searchTeam(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <FlatList
        data={results}
        renderItem={({ item }) => <RestaurantCard details={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    paddingBottom: 100,
  },
});

export default SearchScreen;
