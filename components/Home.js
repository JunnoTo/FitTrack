import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

export default function Home() {
    const navigation = useNavigation()

    const addExercise = () => {
        navigation.navigate("ExerciseGroups")
    }

    const calorieCalculator = () => {
      navigation.navigate("CalorieCalculator")
    }
  return (
    <View>

        <TouchableOpacity
          onPress={addExercise}>
        <Text> Add Exercise </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={calorieCalculator}>
        <Text> Calorie Calculator </Text>
        </TouchableOpacity>
    </View>
  )
}