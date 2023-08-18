import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';

const NoteForm = ({ onSubmit, onSearch }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const id = Date.now();
    onSubmit({ id, title, content });
    setTitle('');
    setContent('');
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.headerContainer}>
        <Image
          source={require('./googlekeep.png')} // Replace with your image path
          style={styles.logo}
        />
        <Text style={styles.logoText}>Keep</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search notes..."
        placeholderTextColor="#999"
        onChangeText={onSearch}
      />
      <View style={styles.outerBox}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <View style={styles.separator} />
        <TextInput
          style={styles.input}
          placeholder="Content"
          placeholderTextColor="#999"
          value={content}
          onChangeText={text => setContent(text)}
          multiline
        />
      </View>
      <Button title="Add" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
    marginBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logoText: {
    color: 'black',
    fontFamily: 'times new roman',
    fontSize: 30,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 7,
    marginBottom: 60,
    color: 'black',
  },
  outerBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 40,
  },
  input: {
    borderWidth: 0,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
});

export default NoteForm;
