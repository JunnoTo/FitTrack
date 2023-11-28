import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

export default function Exercises() {

  const navigation = useNavigation()

  const handleExercisePress = (exercise) => {
    navigation.navigate("ExerciseList", { category: exercise });
  }
  return (
    <View>
      <TouchableOpacity onPress={() => handleExercisePress('Abs')}>
        <Text>Abs</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleExercisePress('Back')}>
        <Text>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleExercisePress('Biceps')}>
        <Text>Biceps</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleExercisePress('Cardio')}>
        <Text>Cardio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleExercisePress('Chest')}>
        <Text>Chest</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleExercisePress('Legs')}>
        <Text>Legs</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleExercisePress('Shoulders')}>
        <Text>Shoulders</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleExercisePress('Triceps')}>
        <Text>Triceps</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleExercisePress('Custom')}>
        <Text>Your Exercises</Text>
      </TouchableOpacity>
      
    </View>
  )
}