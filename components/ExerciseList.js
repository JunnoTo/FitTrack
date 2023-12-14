import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
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

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#121212'
  },
  titleContainer:{
    flexDirection:'row',
    borderWidth: 1,
    borderColor: '#333',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title:{
    fontSize: 25,
    color: '#ccc',
  },
});
