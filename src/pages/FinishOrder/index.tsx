import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FinishOrder() {
  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Você deseja finalizar ese pedido?</Text>
      <Text style={styles.title}>Mesa 30</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Finalizar Pedido</Text>
        <FontAwesome5 name="shopping-cart" size={20} color={"#1d1d2e"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    width: "65%",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#1d1d2e",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "4%",
    paddingVertical: "5%",
  },
  textButton: {
    color: "#1d1d2e",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
