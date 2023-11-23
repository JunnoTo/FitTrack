import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';



export default function WeightExercise({ route }) {
  
    const routes = useRoute();
    const { exercise } = route.params;
    const [ weight, setWeight ] = useState(0);
    const [ sets, setSets ] = useState(0);
    const [ reps, setReps ] = useState(0);
    const [ notes, setNotes ] = useState('');

    const increaseWeight = () => {
        setWeight(weight + 1);
    }

    const decreaseWeight = () => {
        if (weight > 0   ){
        setWeight(weight - 1);
        }
    }

    const increaseSets = () => {
      setSets(sets + 1);
    }

    const decreaseSets = () => {
      if (sets > 0) {
        setSets(sets - 1);
      }
    }

    const increaseReps= () => {
        setReps(reps + 1);
    }
    
    const decreaseReps= () => {
        if (reps > 0   ){
        setReps(reps - 1);
        }
    }

    const saveWorkout = async ( type, name, weight, sets, reps, notes ) => {
      try {
        const existingWorkouts = await AsyncStorage.getItem('workouts');
        let workouts = [];

        if (existingWorkouts) {
          workouts = JSON.parse(existingWorkouts);
      }
    
      const currentDate = new Date().toLocaleDateString();
      const workoutData = {
        type: 'weightRep',
        name: exercise,
        weight,
        sets,
        reps,
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
      saveWorkout( 'weightRep', name, weight, sets, reps, notes );
    };

    return (
        <View >
            <Text>Weight: </Text>
            <TouchableOpacity  onPress={decreaseWeight}>
                <Text>-</Text>
            </TouchableOpacity>

          <TextInput
            value={String(weight)}
            keyboardType="numeric"
            onChangeText={(text) => setWeight(parseInt(text) || 0)}
            />

          <TouchableOpacity  onPress={increaseWeight}>
            <Text>+</Text>
          </TouchableOpacity>

          <Text>Sets: </Text>
          <TouchableOpacity  onPress={decreaseSets}>
            <Text>-</Text>
          </TouchableOpacity>
          
          <TextInput
            value={String(sets)}
            keyboardType="numeric"
            onChangeText={(text) => setSets(parseInt(text) || 0)}
            />
            
          <TouchableOpacity  onPress={increaseSets}>
            <Text>+</Text>
          </TouchableOpacity>

          <Text>Reps: </Text>
          <TouchableOpacity  onPress={decreaseReps}>
            <Text>-</Text>
          </TouchableOpacity>
          
          <TextInput
            value={String(reps)}
            keyboardType="numeric"
            onChangeText={(text) => setReps(parseInt(text) || 0)}
            />
            
          <TouchableOpacity  onPress={increaseReps}>
            <Text>+</Text>
          </TouchableOpacity>

        

          <Text>Notes:</Text>
          <TextInput 
            onChangeText={(setNotes)}
            value={ notes }
          />

          <TouchableOpacity onPress={handleSaveWorkout}>
            <Text>Save Workout</Text>
          </TouchableOpacity>
        </View>
      );
    };