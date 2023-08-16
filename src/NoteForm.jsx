import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const NoteForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const id = Date.now(); // Generate a unique ID based on current timestamp
    onSubmit({ id, title, content }); // Include the generated id when submitting
    setTitle('');
    setContent('');
  };

  return (
    
    <View style={styles.formContainer}>
      <Text style={styles.text}>Google Keep Clone</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={text => setContent(text)}
      />
      <Button title="Add" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
    marginBottom:40,
  },
  text :{
     color:'white',
     fontFamily:'times new roman',
     fontSize:30,
     justifyContent:'center',
     textAlign:'center',
     backgroundColor:'black',
     marginBottom:20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop:20,
    marginBottom: 10,
    color:'black',
  },
});

export default NoteForm;
