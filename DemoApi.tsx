import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { BigButton, LabelText, TitleText } from "./Shared";
import { useCallback, useState } from "react";
import { Buffer } from "buffer";
import sharedStyles from "./styles";

// const URL = "http://cs411.duckdns.org";
const URL = "http://localhost:3000";
// const URL = "http://172.20.2.238:3000";
// const CLIENT_ID = "brahbrah";
// const CLIENT_SECRET = "secret";

function base64(input: string): string {
  return Buffer.from(input, "utf8").toString("base64");
}

export default function DemoApi() {
  const [fetching, setFetching] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [token, setToken] = useState("");
  const [self, setSelf] = useState<object>();
  const [currentSession, setCurrentSession] = useState<object>();

  const handleSession = () => {
    console.log(`handleSession() token: ${token}`);
    if (!token) {
      console.error("You need a token");
      return;
    }
    setFetching(true);
    fetch(`${URL}/indecisive/current-session`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Response OK");
          return response.json();
        } else {
          return response.text().then((error_txt) => {
            const message = `Status: ${response.status} Body: ${error_txt}`;
            setFetching(false);
            throw new Error(message);
          });
        }
      })
      .then((session) => {
        setFetching(false);
        if (session) {
          // Save this in state
          console.log("Fetch Current session response", session);
          setCurrentSession(session);
        } else {
          throw new Error("Missing session in response");
        }
      })
      .catch((err) => {
        setFetching(false);
        console.error("Error fetching token", err);
      });
  };

  const handleSelf = () => {
    console.log(`handleSelf() token: ${token}`);
    if (!token) {
      console.error("You need a token");
      return;
    }
    setFetching(true);
    fetch(`${URL}/indecisive/self`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((error_txt) => {
            const message = `Status: ${response.status} Body: ${error_txt}`;
            setFetching(false);
            throw new Error(message);
          });
        }
      })
      .then((self) => {
        setFetching(false);
        if (self) {
          // Save this in state
          console.log("Fetch self response", self);
          setSelf(self);
        } else {
          throw new Error("Missing session in response");
        }
      })
      .catch((err) => {
        setFetching(false);
        console.error("Error fetching token", err);
      });
  };

  const handleToken = useCallback(() => {
    console.log(`handleToken(${URL}/token})`);
    // clear previous token
    setToken("");
    setFetching(true);
    if (fetching) {
      console.log("Waiting for previous fetch to complete");
      return;
    }
    fetch(`${URL}/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: new Headers({
        Authorization: `Basic ${base64(`${clientId}:${clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((error_txt) => {
            const message = `Status: ${response.status} Body: ${error_txt}`;
            setFetching(false);
            throw new Error(message);
          });
        }
      })
      .then((auth) => {
        setFetching(false);
        if (auth) {
          // Save this in state
          console.log("Auth response", auth);
          console.log("Access Token:", auth.access_token);
          setToken(auth.access_token);
        } else {
          throw new Error("Missing auth in response");
        }
      })
      .catch((err) => {
        setFetching(false);
        console.error(`Error fetching token ${err}`);
      });
  }, [fetching, token, clientId, clientSecret, console]);

  return (
    <View style={styles.container}>
      <TitleText>API Demo</TitleText>
      <LabelText>{fetching ? "fetching..." : "waiting"}</LabelText>
      <TextInput
        style={sharedStyles.input}
        autoCapitalize="none"
        value={clientId}
        onChangeText={setClientId}
        onSubmitEditing={handleToken}
      />
      <TextInput
        style={sharedStyles.input}
        autoCapitalize="none"
        value={clientSecret}
        onChangeText={setClientSecret}
        onSubmitEditing={handleToken}
      />
      <ScrollView
        style={sharedStyles.scroll}
        contentContainerStyle={sharedStyles.scrollContainer}
      >
        <BigButton title="Fetch Token" onPress={handleToken} />
        <LabelText>{token || "No token"}</LabelText>
        <BigButton title="Fetch Self" onPress={handleSelf} />
        <LabelText>
          {self ? JSON.stringify(self, undefined, 2) : "No self"}
        </LabelText>
        <BigButton title="Fetch Session" onPress={handleSession} />
        <LabelText>
          {currentSession
            ? JSON.stringify(currentSession, undefined, 2)
            : "No self"}
        </LabelText>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
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
    gap: 8,
  },
});
