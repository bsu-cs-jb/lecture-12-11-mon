import React from "react";
import { Platform } from "react-native";
import ModalDemo from "./ModalDemo";
import IPhone14Device from "./iPhoneDevice";

function WrappedApp() {
  const app = <ModalDemo />;
  if (Platform.OS === "web") {
    return <IPhone14Device>{app}</IPhone14Device>;
  } else {
    return app;
  }
}

export default WrappedApp;
