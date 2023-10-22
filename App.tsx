import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { FlexFill, LabelText, TitleText } from "./Shared";
import IPhone14Device from "./iPhoneDevice";

export default function App() {
  return (
    <IPhone14Device>
      <View style={styles.container}>
        <TitleText>Top iPhone Title</TitleText>
        <FlexFill />
        <LabelText>Bottom Text</LabelText>
        <StatusBar style="auto" />
      </View>
    </IPhone14Device>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf",
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});
