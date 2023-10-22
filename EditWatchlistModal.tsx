import React, { useEffect, useState } from "react";
import { BigButton, FlexFill, LabelText, TitleText } from "./Shared";
import sharedStyles from "./styles";
import { Modal, SafeAreaView, View, TextInput, StyleSheet } from "react-native";

interface EditWatchlistModalProps {
  visible: boolean;
  name?: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

const MAX_NAME_LENGTH = 20;

export function EditWatchlistModal({
  visible,
  name,
  onSave,
  onCancel,
}: EditWatchlistModalProps) {
  const [newName, setNewName] = useState(name ?? "");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  useEffect(() => {
    if (name !== undefined) {
      setNewName(name);
    } else {
      setNewName("");
    }
    setErrorMessage("");
  }, [name]);

  const clearState = () => {
    setNewName("");
    setErrorMessage("");
  };

  const handleCancel = () => {
    clearState();
    onCancel();
  };

  const handleSave = () => {
    // validate the input
    if (validateInput(newName)) {
      clearState();
      onSave(newName.trim());
    }
  };

  const validateInput = (name: string) => {
    if (!name.trim()) {
      setErrorMessage("Please enter a name.");
      return false;
    } else if (name.length >= MAX_NAME_LENGTH) {
      // clear the error message
      setErrorMessage(`Name can only be ${MAX_NAME_LENGTH} characters.`);
    } else {
      // clear the error message
      setErrorMessage(undefined);
    }
    return true;
  };

  const handleNameChange = (text: string) => {
    // always set the newName, even if the input fails validation
    setNewName(text);
    // (optional) validate the input as the user is typing
    validateInput(text);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <SafeAreaView style={sharedStyles.modalTop}>
        <View style={sharedStyles.modalContainer}>
          <TitleText>Add Watchlist</TitleText>
          {errorMessage && (
            <LabelText style={styles.errorText}>{errorMessage}</LabelText>
          )}
          <View style={sharedStyles.formContainer}>
            <View style={sharedStyles.formRow}>
              <View style={[sharedStyles.formColumn, { flex: 0.35 }]}>
                <LabelText>Name:</LabelText>
              </View>
              <View style={sharedStyles.formColumn}>
                <TextInput
                  style={sharedStyles.input}
                  value={newName}
                  onChangeText={handleNameChange}
                  autoFocus={true}
                  maxLength={MAX_NAME_LENGTH}
                  selectTextOnFocus={true}
                  onSubmitEditing={handleSave}
                />
              </View>
            </View>
          </View>
          <View style={sharedStyles.horzContainer}>
            <BigButton title="Cancel" onPress={handleCancel} />
            <FlexFill />
            <BigButton title="Save" onPress={handleSave} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
  },
});
