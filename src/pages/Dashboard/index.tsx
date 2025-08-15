import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Text>Tela de Dashboard</Text>
      <Button title="sair do app" onPress={signOut} />
    </View>
  );
}
