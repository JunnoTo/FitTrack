import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
import RandomQuote from './components/RandomQuote';
import BodyWeightTrack from './components/BodyWeightTrack';

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
      fontSize: 30,
    },
    headerTitleAlign: 'center',
  };
  const handleQuoteAnimationComplete = () => {
    setQuoteAnimationComplete(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      {/* 
      {!quoteAnimationComplete && <RandomQuote onComplete={handleQuoteAnimationComplete} />}
      {quoteAnimationComplete && (
        */}
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

        <Stack.Screen
          name="Body-weight"
          component={BodyWeightTrack}
        />
      </Stack.Navigator>
    </NavigationContainer>
    {/* )} */}      
    </View>
      );
}

