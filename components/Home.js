import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home() {
    const navigation = useNavigation()
    const [savedWorkouts, setSavedWorkouts] = useState([])

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
  
    useFocusEffect(
      useCallback(() => {
        fetchWorkouts();
      }, [])
    );
  
    const addExercise = () => {
        navigation.navigate("ExerciseGroups")
    }

    const calorieCalculator = () => {
      navigation.navigate("CalorieCalculator")
    }
  return (
    <ScrollView>

        <TouchableOpacity
          onPress={addExercise}>
        <Text> Add Exercise </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={calorieCalculator}>
        <Text> Calorie Calculator </Text>
        </TouchableOpacity>

        <Text>Saved Workouts:</Text>
      {savedWorkouts.length > 0 ? (
        savedWorkouts.map((workout, index) => (
          <View key={index}>
            <Text>Exercise: {workout.name}</Text>
            <Text>Weight: {workout.weight}</Text>
            <Text>Reps: {workout.reps}</Text>
            <Text>Date: {workout.date} </Text>
          </View>
        ))
      ) : (
        <Text>No saved workouts</Text>
      )}
    </ScrollView>
  )
}