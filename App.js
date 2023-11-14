import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExerciseGroups from './components/ExerciseGroups';
import ExerciseList from './components/ExerciseList';
import WeightExercise from './components/WeightExercise';
import TimeDistanceExercise from './components/TimeDistanceExercise';
import Home from './components/Home';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          options={{title:'Add an Exercise'}}
          name="ExerciseGroups"
          component={ExerciseGroups} 
        />

        <Stack.Screen
          name="ExerciseList"
          component={ExerciseList}
          options={({ route}) => ({ title:`${route.params.category} Exercises` })}
        />

        <Stack.Screen
          name="WeightExercise"
          component={WeightExercise}
        />
        
        <Stack.Screen
        name="TimeDistanceExercise"
        component={TimeDistanceExercise}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
