import React, { useEffect, useState } from "react";
import { BigButton, FlexFill, LabelText, TitleText } from "./Shared";
import sharedStyles from "./styles";
import { Modal, SafeAreaView, View, TextInput } from "react-native";

interface EditWatchlistModalProps {
  visible: boolean;
  name?: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export function EditWatchlistModal({
  visible,
  name,
  onSave,
  onCancel,
}: EditWatchlistModalProps) {
  const [newName, setNewName] = useState(name ?? "");
  useEffect(() => {
    if (name) {
      setNewName(name);
    }
  }, [name]);
  const handleSave = () => {
    onSave(newName);
    setNewName("");
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <SafeAreaView style={sharedStyles.modalTop}>
        <View style={sharedStyles.modalContainer}>
          <TitleText>Add Watchlist</TitleText>
          <View style={sharedStyles.formContainer}>
            <View style={sharedStyles.formRow}>
              <View style={[sharedStyles.formColumn, { flex: 0.35 }]}>
                <LabelText>Name:</LabelText>
              </View>
              <View style={sharedStyles.formColumn}>
                <TextInput
                  style={sharedStyles.input}
                  value={newName}
                  onChangeText={setNewName}
                  autoFocus={true}
                  selectTextOnFocus={true}
                  onSubmitEditing={handleSave}
                />
              </View>
            </View>
          </View>
          <View style={sharedStyles.horzContainer}>
            <BigButton title="Cancel" onPress={onCancel} />
            <FlexFill />
            <BigButton title="Save" onPress={handleSave} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
