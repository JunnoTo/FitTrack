import { View, Text } from 'react-native'
import React from 'react'
import Abs from './data/Abs'
import Back from './data/Back'
import Biceps from './data/Biceps'
import Cardio from './data/Cardio'
import Chest from './data/Chest'
import Legs from './data/Legs'
import Shoulders from './data/Shoulders'
import Triceps from './data/Triceps'

export default function ExerciseList({route}) {
    const { category } = route.params;

    let exercises;
    switch (category.toLowerCase()) {
        case 'abs':
            exercises = Abs;
            break;
        case 'back':
            exercises = Back;
            break;
        case 'biceps':
            exercises = Biceps;
            break;
        case 'cardio':
            exercises = Cardio;
            break;
        case 'chest':
            exercises = Chest;
            break;
        case 'legs':
            exercises = Legs;
            break;
        case'shoulders':
            exercises = Shoulders;
            break;
        case 'triceps':
            exercises = Triceps;
            break;
        default:
            exercises = [];
    }

  return (
    <View>

      {exercises.map(exercise => (
        <View key={exercise.id}>
            <Text>{exercise.name}</Text>
        </View>
        ))}
    </View>
  )
}