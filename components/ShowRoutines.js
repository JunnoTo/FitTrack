import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RoutineScreen() {
  const navigation = useNavigation();
  const [savedRoutines, setSavedRoutines] = useState([]);

  useEffect(() => {
    fetchRoutines();
  }, []);

  const createRoutine = () => {
    navigation.navigate('CreateRoutine');
  };

  const fetchRoutines = async () => {
    try {
      const storedRoutines = await AsyncStorage.getItem('workoutRoutine');
      console.log(storedRoutines);
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Your Saved Routines
      </Text>
      {savedRoutines.length > 0 ? (
        savedRoutines.map((routine, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>{routine.name}</Text>
            <Text>{routine.exercises.join(', ')}</Text>
          </View>
        ))
      ) : (
        <Text>No saved routines found.</Text>
      )}

      <TouchableOpacity onPress={createRoutine}>
        <Text>Create Routine</Text>
      </TouchableOpacity>
    </View>
  );
}
