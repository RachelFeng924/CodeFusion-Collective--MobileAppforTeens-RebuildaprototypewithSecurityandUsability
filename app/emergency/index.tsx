import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEmergencyContactContext } from "../../context/contactContext";
import { checkPermission } from "../../lib/utils";

export default function Emergency() {
  const [isLoading, setIsLoading] = useState(false);
  const { emerContacts } = useEmergencyContactContext();

  const callEmergencyNum = async () => {
    const phoneNumber = "tel:911";

    try {
      await Linking.openURL(phoneNumber);
    } catch (error) {
      console.error("Error making emergency phone call", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/homepage" asChild>
          <Pressable>
            <Image
              source={require("../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>Emergency</Text>
      </View>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#683d7d" />
        </View>
      )}
      <Pressable style={styles.button} onPress={callEmergencyNum}>
        <Image
          style={styles.image}
          source={require("../../assets/images/telephone.png")}
        />
        <Text style={styles.text}>Call 911</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setIsLoading(true);
          checkPermission(setIsLoading, emerContacts);
        }}
      >
        <Image
          style={styles.image}
          source={require("../../assets/images/location.png")}
        />
        <Text style={styles.text}>Send location to contacts</Text>
      </Pressable>
      <Link href="/emergency/contactsPage" style={styles.link} asChild>
        <Pressable style={styles.button}>
          <Image
            style={styles.image}
            source={require("../../assets/images/friends.png")}
          />
          <Text style={styles.text}>Call a friend</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //paddingTop: "20%",
    alignItems: "center",
    gap: 25,
  },
  text: {
    color: "#683d7d",
    fontSize: 15,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#683d7d",
    borderStyle: "solid",
    width: "85%",
    height: 40,
    position: "relative",
    backgroundColor: "#ffffff",
  },
  image: {
    height: 25,
    width: 25,
    position: "absolute",
    left: "5%",
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    backgroundColor: "black",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    transitionProperty: "opacity, visibility",
    transitionDuration: "0.75s",
    zIndex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginTop: "20%",
    marginBottom: "10%",
  },
  backimage: {
    height: 30,
    width: 30,
    marginRight: "-10%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
