import { useRoute, RouteProp } from "@react-navigation/native";
import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";

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
      <Text>Página order</Text>
      <Text>{route.params.number}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
});
