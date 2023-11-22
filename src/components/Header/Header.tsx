import { ImageBackground, StyleSheet, Text, View } from "react-native";
const topImage = require("./../../../assets/bg.jpg");

export function Header() {
  return (
    <ImageBackground source={topImage} resizeMode="cover" style={styles.image}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Lista de tarefas</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 100,
    marginBottom: 14,
  },
  overlay: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    padding: 9,
    color: "white",
  },
});
