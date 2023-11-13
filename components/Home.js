import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

export default function Home() {
    const navigation = useNavigation()

    const addExercise = () => {
        navigation.navigate("ExerciseGroups")
    }
  return (
    <View>

        <TouchableOpacity
        onPress={addExercise}>
            <Text> Add Exercise </Text>
        </TouchableOpacity>
    </View>
  )
}