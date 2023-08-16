import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Note = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    const updatedNote = { ...note, title: editedTitle, content: editedContent };
    onUpdate(updatedNote);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(note);
  };

  return (
    <View style={styles.noteContainer}>
      {isEditing ? (
        <View>
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
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.noteTitle}>{note.title}</Text>
          <Text style={styles.noteContent}>{note.content}</Text>
          <TouchableOpacity style={styles.updateButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  updateButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 5,
    marginTop:10,
    width:80,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  contentInput: {
    height: 100,
  },
  saveButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop:5,
    width:80,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop:10,
    width:80,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Note;
