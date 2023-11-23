import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function TimeDistanceExercise({ route }) {

    const routes = useRoute();
    const { exercise } = route.params;
    const [ time, setTime ] = useState(0);
    const [ distance, setDistance ] = useState(0);
    const [ notes, setNotes ] = useState('');

    const increaseTime = () => {
        setTime(time + 1);
    }

    const decreaseTime = () => {
        if (time > 0   ){
        setTime(time - 1);
        }
    }

    const increaseDistance= () => {
        setDistance(distance + 1);
    }
    
    const decreaseDistance= () => {
        if (distance > 0   ){
        setDistance(distance - 1);
        }
    }

    const saveWorkout = async ( type, name, time, distance, notes ) => {
      try {
        const existingWorkouts = await AsyncStorage.getItem('workouts');
        let workouts = [];

        if (existingWorkouts) {
          workouts = JSON.parse(existingWorkouts);
      }
    
      const currentDate = new Date().toLocaleDateString();
      const workoutData = {
        type: 'timeDistance',
        name: exercise,
        time,
        distance,
        notes,
        date: currentDate,
      };

      workouts.push(workoutData);

      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));

      alert('Workout saved!');
      } catch (error) {
        console.log('Error saving workout', error);
      }
    };

    const handleSaveWorkout = ( name ) => {
      saveWorkout( 'timeDistance', name, time, distance, notes );
    };
    

    return (
        <View >
            <Text>Time: </Text>
            <TouchableOpacity  onPress={decreaseTime}>
                <Text>-</Text>
            </TouchableOpacity>

          <TextInput
            value={String(time)}
            keyboardType="numeric"
            onChangeText={(text) => setTime(parseInt(text) || 0)}
            />

          <TouchableOpacity  onPress={increaseTime}>
            <Text>+</Text>
          </TouchableOpacity>

          <Text>Distance: </Text>
          <TouchableOpacity  onPress={decreaseDistance}>
            <Text>-</Text>
          </TouchableOpacity>
          
          <TextInput
            value={String(distance)}
            keyboardType="numeric"
            onChangeText={(text) => setDistance(parseInt(text) || 0)}
            />
            
          <TouchableOpacity  onPress={increaseDistance}>
            <Text>+</Text>
          </TouchableOpacity>

          <Text>Notes: </Text>
          <TextInput
            onChangeText={( setNotes )}
            value={ notes }
            />

          <TouchableOpacity onPress={handleSaveWorkout}>
            <Text>Save Workout</Text>
          </TouchableOpacity>
        </View>
      );
    };