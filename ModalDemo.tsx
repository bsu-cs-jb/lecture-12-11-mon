import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import { BigButton, FlexFill, LabelText, TitleText } from "./Shared";
import { useState } from "react";
import sharedStyles from "./styles";
import { EditWatchlistModal } from "./EditWatchlistModal";
import { genid, log, range } from "./utils";

interface Entry {
  id: string;
  name: string;
}

interface EntryViewProps {
  entry: Entry;
  onDelete: (entry: Entry) => void;
  onEdit: (entry: Entry) => void;
  onView: (entry: Entry) => void;
}

function EntryView({ entry, onDelete, onEdit, onView }: EntryViewProps) {
  return (
    <View style={sharedStyles.horzContainer}>
      <LabelText>{entry.name}</LabelText>
      <FlexFill />
      <BigButton title="Del" onPress={() => onDelete(entry)} />
      <BigButton title="Edit" onPress={() => onEdit(entry)} />
      <BigButton title="View" onPress={() => onView(entry)} />
    </View>
  );
}

export default function ModalDemo() {
  const [entries, setEntries] = useState([
    {
      id: genid(),
      name: "Chester",
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  for (const _k of range(30)) {
    console.log(genid());
  }

  const handleSave = (name: string) => {
    setEntries([
      ...entries,
      {
        id: genid(),
        name,
      },
    ]);
    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleAddEntry = () => {
    setModalVisible(true);
  };

  const handleDelete = (entry: Entry) => {
    log(`handleDelete(${entry.name}) ${entry.id}`);
    setEntries(entries.filter((e) => e.id !== entry.id));
  };

  const handleEdit = (entry: Entry) => {
    log(`handleEdit(${entry.name})`);
  };

  const handleView = (entry: Entry) => {
    log(`handleView(${entry.name})`);
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
        {entries.map((entry) => (
          <EntryView
            key={entry.id}
            entry={entry}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onView={handleView}
          />
        ))}
      </ScrollView>
      <BigButton title="Add entry" onPress={handleAddEntry} />
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
    gap: 8,
  },
});
