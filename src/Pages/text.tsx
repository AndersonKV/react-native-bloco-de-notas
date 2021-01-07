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
  TouchableWithoutFeedback,
  TouchableHighlight,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import {faSave, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const window = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

const TextScreen: React.FC = ({navigation, route}) => {
  const [title, setTitle] = React.useState('');
  const [note, setNote] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  React.useEffect(() => {
    async function init() {
      if (route.params.todo) {
        const todo = route.params.todo;
        setTitle(todo.title);
        setNote(todo.note);
        navigation.setOptions({
          title: todo.title,
        });
      }
    }
    init();
  }, []);

  const submitHandler = async () => {
    const STORAGE_KEY = '@notepad';

    //verifica se tem guardado
    const getNotes = await AsyncStorage.getItem(STORAGE_KEY);

    const arrNotes = JSON.parse(getNotes || '[]');

    const arr: any = [];

    if (title.length === 0 && note.length === 0) {
      Alert.alert('Bloco de notas vazio');
      return;
    }

    // if (arrNotes.length === 0) {
    //   if (title.length === 0) {
    //     arr.push({title: 'bloco de notas salvo 1', note: note, id: 1});
    //   } else {
    //     arr.push({title, note, id: 1});
    //   }
    // } else {
    //   if (title.length === 0) {
    //     arr.push({
    //       title: 'bloco de notas salvo ' + (arrNotes.length + 1),
    //       note: note,
    //       id: arrNotes.length + 1,
    //     });
    //   } else {
    //     arr.push({title, note, id: arrNotes.length + 1});
    //   }
    // }
    // var arrFinal = arrNotes.concat(arr);
    if (route.params.todo.id) {
      arrNotes.forEach((element) => {
        if (element.id === route.params.todo.id) {
          arr.push({title, note, id: route.params.todo.id});
        } else {
          arr.push({
            title: element.title,
            note: element.note,
            id: element.id,
          });
        }
      });
    }

    const stringifiedArray = JSON.stringify(arr);
    await AsyncStorage.setItem(STORAGE_KEY, stringifiedArray);
    //Alert.alert('Salvo', 'Texto salvo');
    setModalVisible(true);
  };

  const handleDelete = async () => {
    const STORAGE_KEY = '@notepad';

    //verifica se tem guardado
    const getNotes = await AsyncStorage.getItem(STORAGE_KEY);

    const arrNotes = JSON.parse(getNotes || '[]');

    const arr: any = [];

    if (route.params.todo) {
      arrNotes.forEach((element) => {
        if (element.id !== route.params.todo.id) {
          arr.push({
            title: element.title,
            note: element.note,
            id: element.id,
          });
        }
      });

      const stringifiedArray = JSON.stringify(arr);
      await AsyncStorage.setItem(STORAGE_KEY, stringifiedArray);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.h1}
        placeholder="Titulo..."
        placeholderTextColor="white"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <TextInput
        style={styles.text}
        placeholder="Digite..."
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setNote(text)}
        placeholderTextColor="white"
        value={note}
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
        style={styles.btnDelete}
        onPress={() =>
          Alert.alert(
            'Arquivo vai ser deletado',
            'Tem certeza?',
            [
              {
                text: 'Não',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Sim', onPress: () => handleDelete()},
            ],
            {cancelable: false},
          )
        }>
        <FontAwesomeIcon icon={faTrash} size={30} color="whitesmoke" />
      </TouchableOpacity>

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

export default TextScreen;
