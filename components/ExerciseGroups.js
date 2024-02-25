import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../styles/exerciseGroups.js'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/Ionicons";


export default function Exercises() {

  const navigation = useNavigation()

  const handleExercisePress = (exercise) => {
    navigation.navigate("ExerciseList", { category: exercise });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={() => handleExercisePress('Abs')}>
        <Text style={styles.title}>Abs</Text>
        <Icon name="chevron-forward" style={styles.icon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleContainer} onPress={() => handleExercisePress('Back')}>
        <Text style={styles.title}>Back</Text>
        <Icon name="chevron-forward" style={styles.icon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleContainer} onPress={() => handleExercisePress('Biceps')}>
        <Text style={styles.title}>Biceps</Text>
        <Icon name="chevron-forward" style={styles.icon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleContainer} onPress={() => handleExercisePress('Cardio')}>
        <Text style={styles.title}>Cardio</Text>
        <Icon name="chevron-forward" style={styles.icon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleContainer} onPress={() => handleExercisePress('Chest')}>
        <Text style={styles.title}>Chest</Text>
        <Icon name="chevron-forward" style={styles.icon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleContainer} onPress={() => handleExercisePress('Legs')}>
        <Text style={styles.title}>Legs</Text>
        <Icon name="chevron-forward" style={styles.icon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleContainer} onPress={() => handleExercisePress('Shoulders')}>
        <Text style={styles.title}>Shoulders</Text>
        <Icon name="chevron-forward" style={styles.icon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleContainer} onPress={() => handleExercisePress('Triceps')}>
        <Text style={styles.title}>Triceps</Text>
        <Icon name="chevron-forward" style={styles.icon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleContainer} onPress={() => handleExercisePress('Custom')}>
        <Text style={styles.title}>Your Exercises</Text>
        <Icon name="chevron-forward" style={styles.icon}/>
      </TouchableOpacity>
      
    </View>
  )
};
