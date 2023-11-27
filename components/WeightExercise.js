import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';



export default function WeightExercise({ route }) {
  
    const routes = useRoute();
    const { exercise } = route.params;
    const [ weight, setWeight ] = useState(0);
    const [ reps, setReps ] = useState(0);
    const [ notes, setNotes ] = useState('');
    const [ thisWorkout, setThisWorkout ] = useState([]);

    const increaseWeight = () => {
        setWeight(weight + 1);
    }

    const decreaseWeight = () => {
        if (weight > 0   ){
        setWeight(weight - 1);
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

    const saveWorkout = async ( type, name, weight, reps, notes ) => {
      try {
        const existingWorkouts = await AsyncStorage.getItem('workouts');
        let workouts = [];

        if (existingWorkouts) {
          workouts = JSON.parse(existingWorkouts);
      }
    
      const currentDate = new Date().toLocaleDateString('en-GB');
      const workoutData = {
        type: 'weightRep',
        name: exercise,
        weight,
        reps,
        notes,
        date: currentDate,
      };

      workouts.push(workoutData);

      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));

      alert('Workout saved!');
      clearFields();

      const storedWorkouts = await AsyncStorage.getItem('workouts');
      if (storedWorkouts) {
        const parsedWorkouts = JSON.parse(storedWorkouts);
        const filterWorkouts = parsedWorkouts.filter(workout => workout.date === currentDate && workout.name === exercise);
        setThisWorkout(filterWorkouts);
      }
      } catch (error) {
        console.log('Error saving workout', error);
      }
    };

    const handleSaveWorkout = ( name ) => {
      saveWorkout( 'weightRep', name, weight, reps, notes );
    };

    const clearFields = () => {
      setWeight(0)
      setReps(0)
      setNotes('')
    }

    useEffect(() => {
      const fetchWorkouts = async () => {
        try {
          const storedWorkouts = await AsyncStorage.getItem('workouts');
          if (storedWorkouts) {
            const parsedWorkouts = JSON.parse(storedWorkouts);
            const currentDate = new Date().toLocaleDateString('en-GB');
            const filterWorkouts = parsedWorkouts.filter(
              workout => workout.date === currentDate && workout.name === exercise
            );
            setThisWorkout(filterWorkouts);
          }
        } catch (error) {
          console.error('Error fetching workouts:', error);
        }
      };
      fetchWorkouts();
    }, []);
    
    const deleteWorkout = async ( index ) => {
      try {
          const updatedWorkouts = thisWorkout.filter((_, i) => i!== index);
          await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
          setThisWorkout(updatedWorkouts);
      } catch (error) {
          console.log('Error deleting workout:', error);
      }
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

          <View>
            {thisWorkout.length > 0 && thisWorkout.map((workout, index) => (
              <View style={styles.savedWorkoutContainer} key={index}>
                <Text> Weight: {workout.weight}</Text>
                <Text> Reps: {workout.reps}</Text>
                <Text> Notes: {workout.notes}</Text>
                <TouchableOpacity onPress={() => Alert.alert(
              'Delete Workout',
              'Are you sure you want to delete this workout?',
              [
                {text: 'Back'},
                {text: 'Confirm', onPress: () => deleteWorkout(index)},
              ],
              {cancelable: false}
            )
            }>
              <Text>Delete Workout</Text>
            </TouchableOpacity>
                </View>
            ))}
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      savedWorkoutContainer: {
        borderWidth: 1,
        margin: 10,
      }
    });