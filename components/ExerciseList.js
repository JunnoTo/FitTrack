import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExerciseList({ route }) {
    const navigation = useNavigation()
    const { category } = route.params;
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const predefinedExercises = await fetchPredefinedExercises(category);
                let customExercises = [];

               if (category === 'Custom') {
                customExercises = await fetchCustomExercises();
                setExercises(customExercises);
               } else {
                setExercises(predefinedExercises);
               }
            } catch (error) {
                console.error(error);
            }
        };
        fetchExercises();
    }, [category]);

    const fetchPredefinedExercises = async (category) => {
        let predefinedExercises = [];
        switch (category.toLowerCase()) {
            case 'abs':
                predefinedExercises = [
                    {id: 1, name: 'Ab Rollouts'},
                    {id: 2, name: 'Cable Crunches'},
                    {id: 3, name: 'Decline Bench Crunches'},
                    {id: 4, name: 'Hanging Leg Raises'},
                    {id: 5, name: 'Machine Crunhces'},
                    {id: 7, name: 'Roman Chair Leg Raises'},
                    {id: 8, name: 'Russian Twists'},
                    {id: 9, name: 'Seated Cable Twists'},
                ];
                break;
            case 'back':
                predefinedExercises = [
                    {id: 1, name: 'Barbell Row'},
                    {id: 2, name: 'Chin-Ups'},
                    {id: 3, name: 'Deadlift'},
                    {id: 4, name: 'Good Morning'},
                    {id: 5, name: 'Hammer Strength Row'},
                    {id: 6, name: 'Lat Pulldown'},
                    {id: 7, name: 'Machine Shrug'},
                    {id: 8, name: 'Pendlay Row'},
                    {id: 9, name: 'Rack Pull'},
                ];
                break;
            case 'biceps':
                predefinedExercises = [
                    {id: 1, name: 'Barbell Curl'},
                    {id: 2, name: 'Cable Curl'},
                    {id: 3, name: 'Concentration Curl'},
                    {id: 4, name: 'Dumbbell Curl'},
                    {id: 5, name: 'Hammer Curl'},
                    {id: 6, name: 'Incline Dumbbell Curl'},
                    {id: 7, name: 'Preacher Curl'},
                    {id: 8, name: 'Seated Machine Curl'},
                    {id: 9, name: 'Spider Curl'},
                ];
                break;
            case 'cardio':
                predefinedExercises = [
                    {id: 1, name: 'Cycling'},
                    {id: 2, name: 'Elliptical Trainer'},
                    {id: 3, name: 'High Intensity Interval Training (HIIT)'},
                    {id: 4, name: 'Jump Rope'},
                    {id: 5, name: 'Rowing Machine'},
                    {id: 6, name: 'Running'},
                    {id: 7, name: 'Swimming'},
                    {id: 8, name: 'Walking'},
                ];
                break;
            case 'chest':
                predefinedExercises = [
                    {id: 1, name: 'Barbell Bench Press'},
                    {id: 2, name: 'Chest Dip'},
                    {id: 3, name: 'Dumbbell Fly'},
                    {id: 4, name: 'Incline Bench Press'},
                    {id: 5, name: 'Pec Deck'},
                    {id: 6, name: 'Push-Ups'},
                    {id: 7, name: 'Cable Crossover'},
                    {id: 8, name: 'Seated Machine Fly'},
                    {id: 9, name: 'Wide Grip Pull-Ups'},
                ]; 
                break; 
            case 'legs':
                predefinedExercises = [
                    {id: 1, name: 'Calf Raise'},
                    {id: 2, name: 'Glute Bridge'},
                    {id: 3, name: 'Lunge'},
                    {id: 4, name: 'Leg Press'},
                    {id: 5, name: 'Leg Raise'},
                    {id: 6, name: 'Leg Extension'},
                    {id: 7, name: 'Squat'},
                    {id: 8, name: 'Step-Up'},
                    {id: 9, name: 'Hip Abduction'},
                ];
                break;
            case 'shoulders':
                predefinedExercises = [
                    {id: 1, name: 'Arnold Dumbbell Press'},
                    {id: 2, name: 'Behind The Neck Barbell Press'},
                    {id: 3, name: 'Cable Face Pull'},
                    {id: 4, name: 'Lateral Dumbbell Raise'},
                    {id: 5, name: 'Lateral Machine Raise'},
                    {id: 6, name: 'Log Press'},
                    {id: 7, name: 'Overhead Press'},
                    {id: 8, name: 'Push Press'},
                    {id: 9, name: 'Rear Delt Dumbbell Raise'},
                ];
                break;
            case 'triceps': 
                predefinedExercises = [
                    {id: 1, name: 'Cable Overhead Triceps Extension'},
                    {id: 2, name: 'Close Grip Barbell Bench Press'},
                    {id: 3, name: 'Dumbbell Overhead Triceps Extension'},
                    {id: 4, name: 'Lying Triceps Extension'},
                    {id: 5, name: 'Parallel Bar Triceps Dip'},
                    {id: 6, name: 'Ring Dip'},
                    {id: 7, name: 'Rope Push Down'},
                    {id: 8, name: 'Close Grip Bench Press'},
                    {id: 9, name: 'V-Bar Push Down'},
                ];
                break;
            default: 
                break;
        }
        return predefinedExercises;
    };

    const fetchCustomExercises = async () => {
        try {
            const customExercises = await AsyncStorage.getItem('customExercises');
            return customExercises ? JSON.parse(customExercises) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    
    const handleExercisePress = ( exercise ) => {
        if(exercise.category === 'Cardio' || category === 'Cardio'){
            navigation.navigate("TimeDistanceExercise", { exercise: exercise.name });
        } else{
            navigation.navigate("WeightExercise", { exercise: exercise.name });
        }
    }
  return (
    <View>

      {exercises.map((exercise, index) => (
        <View key={index}>
            <TouchableOpacity onPress={() => handleExercisePress(exercise)}>
                <Text>{exercise.name}</Text>
            </TouchableOpacity>
        </View>
        ))}
    </View>
  )
}