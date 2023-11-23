import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function DisplayWorkouts() {
    const [savedWorkouts, setSavedWorkouts] = useState([])
    
    useEffect(() => {
    const fetchWorkouts = async () => {
        try {
            const storedWorkouts = await AsyncStorage.getItem('workouts');
            if (storedWorkouts) {
              setSavedWorkouts(JSON.parse(storedWorkouts));
            }
          } catch (error) {
            console.error('Error fetching workouts:', error);
          }
        };
        fetchWorkouts();
    }, [])

    const deleteWorkout = async ( index ) => {
        try {
            const updatedWorkouts = savedWorkouts.filter((_, i) => i!== index);
            await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
            setSavedWorkouts(updatedWorkouts);
        } catch (error) {
            console.log('Error deleting workout:', error);
        }
    };
    
  return (
    <ScrollView>
      {savedWorkouts.length > 0 ? (
        savedWorkouts.map((workout, index) => (
          <View key={index}>
            <Text>Exercise: {workout.name}</Text>
            <Text>Date: {workout.date}</Text>
            <Text>Notes: {workout.notes} </Text>
            {workout.type === 'weightRep' && (
              <View>
                <Text>Weight: {workout.weight}</Text>
                <Text>Sets: {workout.sets}</Text>
                <Text>Reps: {workout.reps}</Text>
              </View>
            )}
            {workout.type === 'timeDistance' && (
              <View>
                <Text>Time: {workout.time} minutes</Text>
                <Text>Distance: {workout.distance} kilometers</Text>
              </View>
            )}

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
        ))
        
        
      ) : (
        <Text>No saved workouts</Text>
      )}
    </ScrollView>
  );
};