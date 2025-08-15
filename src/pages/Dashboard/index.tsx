import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        placeholder="Número da mesa..."
        placeholderTextColor={"#707070"}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button}>
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
