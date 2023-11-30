import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExerciseGroups from './components/ExerciseGroups';
import ExerciseList from './components/ExerciseList';
import WeightExercise from './components/WeightExercise';
import TimeDistanceExercise from './components/TimeDistanceExercise';
import Home from './components/Home';
import CalorieCalculator from './components/CalorieCalculator';
import CustomExercise from './components/CustomExercise';
import Icon from "react-native-vector-icons/Ionicons";

export default function App() {
  const Stack = createStackNavigator();

  const defaultHeaderStyle = {
    headerStyle: {
      backgroundColor:'#1a1a1a',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: '#D37506',
    headerTitleStyle:{
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{...defaultHeaderStyle}}>
        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="ExerciseGroups"
          component={ExerciseGroups}
          options={({ navigation }) => ({
            title: 'Add an Exercise',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CustomExercise');
                }}
                >
                  <Icon
                    name="add"
                    size={30}
                    color="#D37506"
                  />
                </TouchableOpacity>
            )
          })}
        />

        <Stack.Screen
          name="ExerciseList"
          component={ExerciseList}
          options={({ route, navigation }) => ({ title:`${route.params.category} Exercises`,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CustomExercise');
              }}
              >
                <Icon
                  name="add"
                  size={30}
                  color="#D37506"
                />
              </TouchableOpacity>
          ) })}
        />

        <Stack.Screen
          name="WeightExercise"
          component={WeightExercise}
          options={({ route, navigation }) => ({ title:`${route.params.exercise} `,
          headerLeft: () => (
              <TouchableOpacity
                onPress={() => { navigation.navigate('Home');
            }}
            >
              <Icon
                name="home"
                size={30}
                color="#D37506"
              />
            </TouchableOpacity>
            ),
            headerRight: () => null,
          })}
        />
        
        <Stack.Screen
          name="TimeDistanceExercise"
          component={TimeDistanceExercise}
          options={({ route, navigation }) => ({ title:`${route.params.exercise} `,
          headerLeft: () => (
            <TouchableOpacity
            onPress={() => { navigation.navigate('Home');
        }}
        >
          <Icon
            name="home"
            size={30}
            color="#D37506"
          />
        </TouchableOpacity>
            ),
            headerRight: () => null,
          })}
        />
        
        <Stack.Screen
          name="CalorieCalculator"
          component={CalorieCalculator}
        />

        <Stack.Screen
          name ="CustomExercise"
          component={CustomExercise}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

