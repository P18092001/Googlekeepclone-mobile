import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './src/Note';
import NoteForm from './src/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const handleUpdateNote = updatedNote => {
    const updatedNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    saveNotes(updatedNotes);
  };

  const saveNotes = async newNotes => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes !== null) {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleAddNote = newNote => {
    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
  };

  const handleDeleteNote = noteToDelete => {
    const updatedNotes = notes.filter(note => note.id !== noteToDelete.id);
    saveNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <NoteForm onSubmit={handleAddNote} />
      <ScrollView>
        {notes.map((note, index) => (
          <Note
            key={index}
            note={note}
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default App;
