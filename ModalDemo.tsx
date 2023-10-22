import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import { BigButton, FlexFill, LabelText, TitleText } from "./Shared";
import { useState } from "react";
import sharedStyles from "./styles";
import { EditWatchlistModal } from "./EditWatchlistModal";

interface Entry {
  id: string;
  name: string;
}

function EntryView({ entry }: { entry: Entry }) {
  return (
    <View style={sharedStyles.horzContainer}>
      <LabelText>{entry.name}</LabelText>
      <FlexFill />
      <BigButton title="Del" onPress={() => console.log("Del")} />
      <BigButton title="Edit" onPress={() => console.log("Edit")} />
      <BigButton title="View" onPress={() => console.log("View")} />
    </View>
  );
}

export default function ModalDemo() {
  const [entries, setEntries] = useState([
    {
      id: "23ds",
      name: "Chester",
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleSave = (name: string) => {
    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEntries([
      ...entries,
      {
        id: `23ds-${entries.length}`,
        name: "Hello",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <EditWatchlistModal
        visible={modalVisible}
        name={editName}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <TitleText>Top iPhone Title</TitleText>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "flex-start", gap: 5 }}
      >
        <FlexFill />
        {entries.map((entry) => (
          <EntryView key={entry.id} entry={entry} />
        ))}
      </ScrollView>
      <BigButton title="Add entry" onPress={handleAdd} />
      <BigButton title="Show Modal" onPress={handleShowModal} />
      <LabelText>Bottom Text</LabelText>
      <StatusBar style="auto" />
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
  },
});
