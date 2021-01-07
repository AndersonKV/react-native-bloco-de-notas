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
  Keyboard,
  FlatList,
  Dimensions,
  DatePickerAndroidDismissedAction,
} from 'react-native';

import {faPencilAlt, faSave} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeScreen} from 'react-native-screens';

//const window = Dimensions.get('window');

interface INotes {
  title: string;
  note: string;
  id: number;
}

const HomeSreen: React.FC = ({navigation}) => {
  const [notes, setNotes] = React.useState<INotes[]>();

  React.useEffect(() => {
    async function init() {
      const STORAGE_KEY = '@notepad';

      //AsyncStorage.clear();
      navigation.addListener('focus', async () => {
        const getNotes = await AsyncStorage.getItem(STORAGE_KEY);

        const arrNotes = JSON.parse(getNotes || '[]');

        if (arrNotes) {
          console.log(arrNotes);

          setNotes(arrNotes);
        }
      });
    }
    init();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={notes}
        extraData={true}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.BlockNotes}
            onPress={() => navigation.navigate('TextScreen', {todo: item})}>
            <Text style={{fontSize: 20}}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.iconPencil}
        onPress={() => navigation.navigate('CreateTextScreen')}>
        <FontAwesomeIcon icon={faPencilAlt} size={30} color="whitesmoke" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#483D8B',
  },
  iconPencil: {
    position: 'absolute',
    backgroundColor: 'gray',
    borderRadius: 50,
    borderWidth: 1,
    padding: 20,
    bottom: 40,
    right: 20,
  },
  BlockNotes: {
    backgroundColor: '#BDB76B',
    padding: 10,
    margin: 5,
  },
});

export default HomeSreen;
