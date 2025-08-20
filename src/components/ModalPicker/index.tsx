import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CategoryProps, ProductProps } from "../../pages/Order";

interface ModalPickerProps {
  options: CategoryProps[] | ProductProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps | ProductProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export function ModalPicker({
  handleCloseModal,
  options,
  selectedItem,
}: ModalPickerProps) {
  function onPressItem(item: CategoryProps | ProductProps) {
    selectedItem(item);
    handleCloseModal();
  }

  const option = options.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.option}
      onPress={() => onPressItem(item)}
    >
      <Text style={styles.item}>{item?.name}</Text>
    </TouchableOpacity>
  ));
  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#fff",
    borderColor: "#8a8a8a",
    borderRadius: 4,
    borderWidth: 1,
    height: HEIGHT / 2,
    width: WIDTH - 20,
  },
  item: {
    color: "#101026",
    fontSize: 14,
    fontWeight: "bold",
    margin: 18,
  },
  option: {
    alignItems: "flex-start",
    borderTopColor: "#8a8a8a",
    borderTopWidth: 1,
  },
});
