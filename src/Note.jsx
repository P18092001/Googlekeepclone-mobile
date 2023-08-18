import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Note = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSave = () => {
    const updatedNote = { ...note, title: editedTitle, content: editedContent };
    onUpdate(updatedNote);
    setIsEditing(false);
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    onDelete(note);
  };

  return (
    <KeyboardAvoidingView style={styles.noteContainer} behavior="padding" enabled>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={text => setEditedTitle(text)}
          />
          <TextInput
            style={[styles.input, styles.contentInput]}
            value={editedContent}
            onChangeText={text => setEditedContent(text)}
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.iconButton, {backgroundColor:'green'}]} onPress={handleSave}>
              <Icon name="save" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {!isEditing ? (
        <View>
          <Text style={styles.noteTitle}>{note.title}</Text>
          <Text style={styles.noteContent}>{note.content}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: 'blue' }]}
              onPress={() => setIsModalVisible(true)}
            >
              <Icon name="edit" size={20} color="white" />
            </TouchableOpacity>
            <View style={styles.butonspace}>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: 'red' }]}
              onPress={handleDelete}
            >
              <Icon name="trash-o" size={20} color="white" />
            </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  noteContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  noteContent: {
    marginTop: 5,
    color: 'black',
  },
  // updateButton: {
  //   backgroundColor: 'blue',
  //   borderRadius: 5,
  //   paddingVertical: 5,
  //   paddingHorizontal: 5,
  //   marginBottom: 5,
  //   marginTop: 10,
  //   marginRight: 20,
  //   width: 80,
  // },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: 'black',
    width: '200', 

  },
  // contentInput: {
  //   height: 100,
  // },
  // saveButton: {
  //   backgroundColor: 'green',
  //   borderRadius: 5,
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  //   marginBottom: 5,
  //   marginTop: 5,
  //   width: 80,
  // },
  // deleteButton: {
  //   backgroundColor: 'red',
  //   borderRadius: 5,
  //   paddingVertical: 5,
  //   paddingHorizontal: 5,
  //   marginTop: 10,
  //   width: 80,
  // },
  // buttonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconButton: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 5,
    marginTop: 10,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  butonspace : {
    marginLeft:30,
  }
});

export default Note;
