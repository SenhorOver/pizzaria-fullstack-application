import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [number, setNumber] = useState("");

  async function openOrder() {
    if (number === "") {
      return;
    }

    const response = await api.post("/order", { table: Number(number) });

    // Send req to open table endpoint and navigate to next page
    navigation.navigate("Order", {
      number,
      order_id: response.data.id,
    });

    setNumber("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        placeholder="Número da mesa..."
        placeholderTextColor={"#707070"}
        style={styles.input}
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    marginVertical: 12,
    width: "90%",
  },
  buttonText: {
    color: "#101026",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#1d1d2e",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 15,
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    color: "#fff",
    fontSize: 22,
    height: 60,
    paddingHorizontal: 8,
    textAlign: "center",
    width: "90%",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
  },
});
