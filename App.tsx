import Toast from "@/components/organisms/Toast";
import ExampleScreen from "@/screens/ExampleScreen";
import { useToastStore } from "@/store/toast";
import { lightColors as colors } from "@/theme/colors";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export default function App() {
  const { show, status, title, description, hideToast } = useToastStore();
  return (
    <View style={styles.container}>
      <ExampleScreen />
      <StatusBar style="auto" />
      <Toast
        show={show}
        status={status}
        title={title}
        description={description}
        onClose={hideToast}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceBackground,
  },
});
