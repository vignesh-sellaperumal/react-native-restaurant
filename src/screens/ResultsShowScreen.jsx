import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import yelp from "../api/yelp";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getRestaurantDetails = () => {
    yelp
      .get(`/${navigation?.getParam("id")}`)
      .then((res) => {
        setIsLoading(false);
        setResult(res?.data);
      })
      .catch(() => {
        setIsLoading(false);
        setErrorMessage("Something went wrong!");
      });
  };

  useEffect(() => {
    getRestaurantDetails();
  }, []);

  if (isLoading)
    return (
      <View style={styles.loading}>
        <Text>Loading please wait ...</Text>
      </View>
    );

  const {
    name,
    image_url,
    is_closed,
    display_phone,
    rating,
    review_count,
    location,
    photos,
  } = result;

  const getStars = () =>
    new Array(Math.floor(rating) || 1)
      .fill()
      .map((_, index) => (
        <AntDesign key={`star-${index}`} name="star" size={20} color="gray" />
      ));

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {errorMessage ? <Text>{errorMessage}</Text> : null}

          <View style={styles.rowContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            {is_closed ? (
              <FontAwesome5
                name="door-closed"
                size={24}
                color="red"
                style={styles.closedIcon}
              />
            ) : (
              <FontAwesome5
                name="door-open"
                size={24}
                color="green"
                style={styles.closedIcon}
              />
            )}
          </View>
          <Image source={{ uri: image_url }} style={styles.image} />
          <View style={styles.outerContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.address} numberOfLines={2}>
                {location?.display_address}
              </Text>
              <View style={styles.rowContainer}>
                <Entypo name="old-phone" size={24} color="gray" />
                <Text style={styles.phone}>{display_phone}</Text>
              </View>
              <View style={styles.rowContainer}>{getStars()}</View>
              <Text style={styles.review}>{review_count} reviews</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.orderContainer}>
                <Text style={styles.order}>Order Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.exploreContainer}>
          <Text style={styles.suggetionText}>Not this? Explore more here</Text>
          <FlatList
            data={photos}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                key={item}
                source={{ uri: item }}
                style={styles.suggestionImage}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
  scrollContainer: {
    marginBottom: 30,
  },
  outerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  name: {
    fontSize: 24,
    opacity: 0.9,
    fontWeight: "600",
    marginRight: 6,
    flex: 1,
  },
  closedIcon: {
    opacity: 0.6,
  },
  address: {
    color: "gray",
    marginBottom: 14,
  },
  review: {
    color: "gray",
    marginBottom: 14,
  },
  phone: {
    color: "gray",
    marginLeft: 6,
  },
  image: {
    width: "90vw",
    height: 250,
    borderRadius: 4,
    marginBottom: 14,
  },
  suggestionImage: {
    width: 300,
    height: 200,
    borderRadius: 4,
    marginLeft: 20,
  },
  orderContainer: {
    backgroundColor: "#008B8B",
    borderRadius: 4,
    height: 50,
    width: 150,
    marginVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  suggetionText: {
    fontSize: 14,
    fontWeight: "400",
    color: "gray",
    marginVertical: 14,
    paddingHorizontal: 20,
  },
  exploreContainer: {
    marginBottom: 20,
  },
  order: {
    color: "white",
    opacity: 1,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ResultsShowScreen;
