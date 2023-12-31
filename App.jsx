import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './src/Note';
import NoteForm from './src/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = text => {
    setSearchTerm(text);
  };

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <NoteForm onSubmit={handleAddNote} onSearch={handleSearch} />

      <ScrollView>
        <View style={styles.notesContainer}>
          {filteredNotes.map((note, index) => (
            <Note
              key={index}
              note={note}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  
});

export default App;
