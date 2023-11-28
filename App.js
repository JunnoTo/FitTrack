import React from 'react';
import { Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExerciseGroups from './components/ExerciseGroups';
import ExerciseList from './components/ExerciseList';
import WeightExercise from './components/WeightExercise';
import TimeDistanceExercise from './components/TimeDistanceExercise';
import Home from './components/Home';
import CalorieCalculator from './components/CalorieCalculator';
import DisplayWorkouts from './components/DisplayWorkouts';
import CustomExercise from './components/CustomExercise';

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
          options={({ route, navigation }) => ({ title:`${route.params.category} Exercises`,
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate('CustomExercise');
              }}
              title="Create Exercise"
              color="#000"/>
          ) })}
        />

        <Stack.Screen
          name="WeightExercise"
          component={WeightExercise}
          options={({ route }) => ({ title:`${route.params.exercise} ` })}
        />
        
        <Stack.Screen
          name="TimeDistanceExercise"
          component={TimeDistanceExercise}
          options={({ route }) => ({ title:`${route.params.exercise} ` })}
        />
        
        <Stack.Screen
          name="CalorieCalculator"
          component={CalorieCalculator}
        />

        <Stack.Screen
          name="DisplayWorkouts"
          component={DisplayWorkouts}
        />

        <Stack.Screen
          name ="CustomExercise"
          component={CustomExercise}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

