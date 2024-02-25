import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/exerciseList.js'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import exerciseData from '../exerciseData';

export default function ExerciseList({ route }) {
  const navigation = useNavigation();
  const { category } = route.params;
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        let fetchedExercises = [];

        if (category === 'Custom') {
          fetchedExercises = await fetchCustomExercises();
        } else {
          fetchedExercises = await fetchPredefinedExercises(category);
        }

        setExercises(fetchedExercises);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExercises();
  }, [category]);

  const fetchPredefinedExercises = async (category) => {
    const exercises = exerciseData[category.toLowerCase()] || [];
    return exercises;
  };

  const fetchCustomExercises = async () => {
    try {
      const customExercises = await AsyncStorage.getItem('customExercises');
      return customExercises ? JSON.parse(customExercises) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleExercisePress = (exercise) => {
    if (exercise.category === 'Cardio' || category === 'Cardio') {
      navigation.navigate('TimeDistanceExercise', { exercise: exercise.name });
    } else {
      navigation.navigate('WeightExercise', { exercise: exercise.name });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {exercises.map((exercise, index) => (
        <TouchableOpacity key={index} onPress={() => handleExercisePress(exercise)}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{exercise.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
