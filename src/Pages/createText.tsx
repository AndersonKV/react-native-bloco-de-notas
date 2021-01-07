/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableHighlight,
  Modal,
  Alert,
} from 'react-native';
import {faSave, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeSreen: React.FC = ({navigation}) => {
  const [title, setTitle] = React.useState('');
  const [note, setNote] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const submitHandler = async () => {
    const STORAGE_KEY = '@notepad';

    //verifica se tem guardado
    const getNotes = await AsyncStorage.getItem(STORAGE_KEY);

    const arrNotes = JSON.parse(getNotes || '[]');

    const arr = [];

    if (title.length === 0 && note.length === 0) {
      Alert.alert('Bloco de notas vazio');
      return;
    }

    if (arrNotes.length === 0) {
      if (title.length === 0) {
        arr.push({title: 'bloco de notas salvo 1', note: note, id: 1});
      } else {
        arr.push({title, note, id: 1});
      }
    } else {
      if (title.length === 0) {
        arr.push({
          title: 'bloco de notas salvo ' + (arrNotes.length + 1),
          note: note,
          id: arrNotes.length + 1,
        });
      } else {
        arr.push({title, note, id: arrNotes.length + 1});
      }
    }
    var arrFinal = arrNotes.concat(arr);

    //const newArr = {title: arr[0].title, note: arr[1].note};

    const stringifiedArray = JSON.stringify(arrFinal);
    await AsyncStorage.setItem(STORAGE_KEY, stringifiedArray);
    Alert.alert('Salvo', 'Texto salvo');
  };

  const handleDelete = async () => {
    const STORAGE_KEY = '@notepad';

    //verifica se tem guardado
    const getNotes = await AsyncStorage.getItem(STORAGE_KEY);

    const arrNotes = JSON.parse(getNotes || '[]');

    const arr = [];
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.h1}
        placeholder="Titulo..."
        placeholderTextColor="white"
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.text}
        placeholder="Digite..."
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setNote(text)}
        placeholderTextColor="white"
      />

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Texto salvo</Text>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#483D8B'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.iconPencil}
        onPress={() => submitHandler()}>
        <FontAwesomeIcon icon={faSave} size={30} color="whitesmoke" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#556B2F',
    padding: 10,
  },
  h1: {
    color: 'white',
    fontSize: 20,
    borderBottomColor: 'whitesmoke',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  text: {
    color: 'white',
    fontSize: 20,
    borderBottomColor: 'whitesmoke',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  btnDelete: {
    position: 'absolute',
    backgroundColor: 'gray',
    borderRadius: 50,
    borderWidth: 1,
    padding: 20,
    bottom: 40,
    left: 20,
    borderColor: 'gray',
  },
  iconPencil: {
    position: 'absolute',
    backgroundColor: 'gray',
    borderRadius: 50,
    borderWidth: 1,
    padding: 20,
    bottom: 40,
    right: 20,
    borderColor: 'gray',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default HomeSreen;
