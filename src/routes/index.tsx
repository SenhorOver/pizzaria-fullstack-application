import { StyleSheet, View, ActivityIndicator } from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes() {
  const isAuthenticated = false;
  const loading = false;

  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={60} color={"#F5f7fb"} />
      </View>
    );

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    backgroundColor: "#1d1d2e",
    flex: 1,
    justifyContent: "center",
  },
});

export default Routes;
