import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExerciseGroups from './components/ExerciseGroups';
import ExerciseList from './components/ExerciseList';
import WeightExercise from './components/WeightExercise';
import TimeDistanceExercise from './components/TimeDistanceExercise';
import Home from './components/Home';
import CalorieCalculator from './components/CalorieCalculator';
import CustomExercise from './components/CustomExercise';
import Icon from "react-native-vector-icons/Ionicons";
import RandomQuote from './components/RandomQuote';
import BodyWeightTrack from './components/BodyWeightTrack';
import CreateRoutine from './components/CreateRoutine';
import ShowRoutines from './components/ShowRoutines';

export default function App() {
  const [quoteAnimationComplete, setQuoteAnimationComplete] = useState(false);
  const Stack = createStackNavigator();

  const defaultHeaderStyle = {
    headerStyle: {
      backgroundColor:'#1a1a1a',
      elevation: 1,
      shadowOpacity: 0,
      borderBottomWidth: 3,
      borderColor: '#333',
    },
    headerTintColor: '#D37506',
    headerTitleStyle:{
      fontSize: 26,
    },
    headerTitleAlign: 'center',
  };
  const handleQuoteAnimationComplete = () => {
    setQuoteAnimationComplete(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
     
      {!quoteAnimationComplete && <RandomQuote onComplete={handleQuoteAnimationComplete} />}
      {quoteAnimationComplete && (
        
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{...defaultHeaderStyle}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: "FitTrack"}}
        />

        <Stack.Screen
          name="ExerciseGroups"
          component={ExerciseGroups}
          options={({ navigation }) => ({
            title: 'Select category',
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
                    style={{ marginRight: 10}}
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
          headerTitleAlign: 'left',
          headerLeft: () => (
              <TouchableOpacity
                onPress={() => { navigation.navigate('Home');
            }}
            >
            <View style={{ marginLeft: 20 }}>
              <Icon
                name="home"
                size={30}
                color="#D37506"
              />
            </View>
            </TouchableOpacity>
            ),
            headerRight: () => null,
          })}
        />
        
        <Stack.Screen
          name="TimeDistanceExercise"
          component={TimeDistanceExercise}
          options={({ route, navigation }) => ({ title:`${route.params.exercise} `,
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity
            onPress={() => { navigation.navigate('Home');
        }}
        >
          <View style={{ marginLeft: 10 }}>
            <Icon
              name="home"
              size={30}
              color="#D37506"
            />
          </View>
        </TouchableOpacity>
            ),
            headerRight: () => null,
          })}
        />
        
        <Stack.Screen
          name="CalorieCalculator"
          component={CalorieCalculator}
          options={({ navigation }) => ({
            headerTitle: 'Calorie Calculator',
            headerTitleAlign: 'left',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View style={{ marginLeft: 10 }}>
                  <Icon name="home" size={30} color="#D37506" />
                </View>
              </TouchableOpacity>
            ),
            headerRight: () => null,
          })}
      />

        <Stack.Screen
          name ="CustomExercise"
          component={CustomExercise}
          options={{headerTitle: 'Create Exercise'}}
        />

        <Stack.Screen
          name="Body-weight"
          component={BodyWeightTrack}
          options={{headerTitle: 'Weight Log'}}
        />

        <Stack.Screen
          name="CreateRoutine"
          component={CreateRoutine}
          options={{headerTitle: 'Create Routine'}}
        />

        <Stack.Screen
          name="Routines"
          component={ShowRoutines}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
     )}       
    </View>
      );
}

