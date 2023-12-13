import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import exerciseData from '../exerciseData';


// TODO: Add exercises to existing routines
export default function RoutineScreen() {
  const navigation = useNavigation();
  const [savedRoutines, setSavedRoutines] = useState([]);

  useEffect(() => {
    fetchRoutines();
  }, []);

  useFocusEffect(
    React.useCallback(() =>{
      fetchRoutines();
    }, [])
  );

  const createRoutine = () => {
    navigation.navigate('CreateRoutine');
  };

  const isCardioExercise = (exerciseName) => {
    const cardioExercises = exerciseData.cardio.map((exercise) => exercise.name);
    return cardioExercises.includes(exerciseName);
  }

  const handleExercisePress = (exercise) => {
    if (exercise){
      const isCardio = isCardioExercise(exercise);
      if (isCardio) {
        navigation.navigate('TimeDistanceExercise', {exercise: exercise});
      } else {
        navigation.navigate('WeightExercise', {exercise: exercise});
      }
  }
  };

  const fetchRoutines = async () => {
    try {
      const storedRoutines = await AsyncStorage.getItem('workoutRoutine');
      if (storedRoutines !== null) {
        const parsedRoutines = JSON.parse(storedRoutines);
        if (Array.isArray(parsedRoutines)) {
          setSavedRoutines(parsedRoutines);
        } else {
          console.error('Stored routines are not in the expected format:', parsedRoutines);
        }
      }
    } catch (error) {
      console.error('Error fetching routines:', error);
    }
  };

  const removeExercise = async (routineName, exerciseToBeRemoved) => {
    try {
      const updatedRoutines = savedRoutines.map((routine) => {
        if (routine.name === routineName) {
          return {
            ...routine,
            exercises: routine.exercises.filter((exercise) => exercise !== exerciseToBeRemoved),
          };
        }
        return routine;
      });
      setSavedRoutines(updatedRoutines);
      await AsyncStorage.setItem('workoutRoutine', JSON.stringify(updatedRoutines));
    } catch (error) {
      console.error('Error removing exercise: ', error);
    }
  };
  
  const handleRemove = (routineName, exercise) => {
    if(routineName && exercise) {
      removeExercise(routineName, exercise);
    }
  };

  const deleteRoutine = async(routineName, index) => {
    try {
      const updatedRoutines = [...savedRoutines];
      updatedRoutines.splice(index, 1);

      setSavedRoutines(updatedRoutines);

      await AsyncStorage.setItem('workoutRoutine', JSON.stringify(fetchRoutines(updatedRoutines)));
    } catch (error) {
      console.error('Error deleting routine: ', error);
    }
  }

  return (
    <ScrollView>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Your Saved Routines
      </Text>
      {savedRoutines.length > 0 ? (
        savedRoutines.map((routine, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>{routine.name}</Text>
            <TouchableOpacity onPress={() => deleteRoutine(routine.name, index)}>
              <Text>Delete routine</Text>
            </TouchableOpacity>
            {routine.exercises.map((exercise, exerciseIndex) => (
              <View key={exerciseIndex}>
                <TouchableOpacity onPress={() => handleExercisePress(exercise)}>
                  <Text>{exercise}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemove(routine.name, exercise)}>
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text>No saved routines found.</Text>
      )}

      <TouchableOpacity onPress={createRoutine}>
        <Text>Create Routine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
