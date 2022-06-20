import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.primary,
  },
  blur: {
    width: "100%",
    height: "100%",
    backdropFilter: "brightness(60%)",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {},
});

export default styles;
