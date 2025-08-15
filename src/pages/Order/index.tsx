import { Feather } from "@expo/vector-icons";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type RouteDetailParams = {
  Order: {
    number: number | string;
    order_id: string;
  };
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        <TouchableOpacity>
          <Feather name="trash-2" size={28} color={"#ff3f4b"} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
        <Text style={{ color: "#fff" }}>Pizzas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input}>
        <Text style={{ color: "#fff" }}>Pizza de calabresa</Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={styles.qtdInput}
          placeholder="1"
          placeholderTextColor={"#707070"}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    width: "75%",
  },
  buttonAdd: {
    alignItems: "center",
    backgroundColor: "#3fd1ff",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    width: "20%",
  },
  buttonText: {
    color: "#101026",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#1d1d2e",
    flex: 1,
    paddingEnd: "4%",
    paddingStart: "4%",
    paddingVertical: "10%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 24,
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    color: "#fff",
    fontSize: 20,
    height: 45,
    justifyContent: "center",
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
  qtdContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  qtdInput: {
    alignItems: "center",
    backgroundColor: "#101026",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    width: "60%",
  },
  qtdText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 14,
  },
});
