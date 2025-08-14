import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      return;
    }

    await signIn({ email, password });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu email..."
          placeholderTextColor={"#707070"}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Digite sua senha..."
          placeholderTextColor={"#707070"}
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    width: "95%",
  },
  buttonText: { color: "#101026", fontSize: 18, fontWeight: "bold" },
  container: {
    alignItems: "center",
    backgroundColor: "#1d1d2e",
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    color: "#fff",
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "95%",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 32,
    width: "95%",
  },
  logo: {
    marginBottom: 18,
  },
});
