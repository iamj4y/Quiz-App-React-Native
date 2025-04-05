import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {useState} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, Button } from 'react-native';
import Question from './Question.js';
import Summary from './Summary.js';

const Stack = createStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Group>
              <Stack.Screen name="Question" component={Question}/>
              <Stack.Screen name="SummaryPage" component={Summary}/>
            </Stack.Group>
          </Stack.Navigator>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  title: {
    margin: 60,
    fontSize: 50,
    fontWeight: 'bold'
  },

  controlElem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
  }
});
