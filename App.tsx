import React from "react";
import { Platform } from "react-native";
import IPhone14Device from "./iPhoneDevice";
import DemoApi from "./DemoApi";

function WrappedApp() {
  const app = <DemoApi />;
  if (Platform.OS === "web") {
    return <IPhone14Device>{app}</IPhone14Device>;
  } else {
    return app;
  }
}

export default WrappedApp;
