import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { withNavigation } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";

const RestaurantCard = ({ details, navigation }) => {
  return (
    details?.image_url && (
      <TouchableOpacity
        onPress={() => navigation?.navigate("Result", { id: details?.id })}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{details?.name}</Text>
          <Image source={{ uri: details?.image_url }} style={styles.image} />
          <View style={styles.reviewContainer}>
            <Text style={styles.rating}>{details?.rating}</Text>
            <AntDesign name="star" size={14} color="gray" style={styles.icon} />
            <Text style={styles.rating}>, {details?.review_count} Reviews</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 14,
  },
  icon: {
    marginLeft: 2,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    opacity: 0.8,
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: "90vw",
    height: 250,
    borderRadius: 4,
  },
  rating: {
    color: "gray",
  },
});

export default withNavigation(RestaurantCard);
