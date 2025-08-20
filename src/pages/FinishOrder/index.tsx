import { FontAwesome5 } from "@expo/vector-icons";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../services/api";
import { StackParamsList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RouteDetailParams = {
  FinishOrder: {
    number: number | string;
    order_id: string;
  };
};

type FinishOrderRouteProps = RouteProp<RouteDetailParams, "FinishOrder">;

export default function FinishOrder() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route = useRoute<FinishOrderRouteProps>();

  async function handleFinish() {
    try {
      await api.put("/order/send", {
        order_id: route.params.order_id,
      });

      navigation.popToTop();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Você deseja finalizar ese pedido?</Text>
      <Text style={styles.title}>Mesa {route.params.number}</Text>
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
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
