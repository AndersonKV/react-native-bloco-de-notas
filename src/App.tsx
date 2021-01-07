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
  Alert,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

import HomeScreen from './Pages/home';
import CreateTextScreen from './Pages/createText';
import TextScreen from './Pages/text';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <Text>Bloco de notas</Text>,
            headerStyle: {
              backgroundColor: 'gold',
            },
          }}
        />
        <Stack.Screen
          name="CreateTextScreen"
          component={CreateTextScreen}
          options={{
            headerTitle: () => <Text>Novo bloco de notas....</Text>,
            headerStyle: {
              backgroundColor: 'gold',
            },
          }}
        />
        <Stack.Screen
          name="TextScreen"
          component={TextScreen}
          options={{
            headerStyle: {
              backgroundColor: 'gold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
});
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Search" component={Search} />
//         <Stack.Screen name="Movie" component={Movie} />
//         <Stack.Screen
//           name="MovieLiked"
//           component={MovieLiked}
//           options={{title: 'Filmes curtidos'}}
//         />
//         <Stack.Screen
//           name="MovieDisliked"
//           component={MovieDisliked}
//           options={{title: 'Filmes não curtidos'}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default App;
