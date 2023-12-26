import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/home.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/core'
import Icon from "react-native-vector-icons/Ionicons";

export default function Home() {
    const navigation = useNavigation()
    const [ workoutsByDate, setWorkoutsByDate ] = useState({});
    const [ showNotes, setShowNotes ] = useState({});
  
    const addExercise = () => {
        navigation.navigate("ExerciseGroups")
    };

    const calorieCalculator = () => {
      navigation.navigate("CalorieCalculator")
    };

    const bodyWeightTrack = () => {
      navigation.navigate("Body-weight")
    };

    const routine = () => {
      navigation.navigate("Routines")
    };

    const editWorkout = (date, index, workoutType) => {
      const workoutToEdit = workoutsByDate[date][index];
      
      if (workoutType === 'weightRep') {
        navigation.navigate('WeightExercise', {
          exercise: workoutToEdit.name,
        });
      } else if (workoutType === 'timeDistance') {
        navigation.navigate('TimeDistanceExercise', {
          exercise: workoutToEdit.name,
        });
      }
    };

    const toggleShowNotes = (date, index) => {
      setShowNotes(prevShowNotes => {
        const newShowNotes = { ...prevShowNotes };
        if (!newShowNotes[date]) {
          newShowNotes[date] = {};
        }
        newShowNotes[date][index] = !newShowNotes[date]?.[index];
        return newShowNotes;
      });
    };

    useEffect(() => {
      fetchWorkouts();
    }, []);

    useFocusEffect(
      React.useCallback(() =>{
        fetchWorkouts();
      }, [])
    );

    const fetchWorkouts = async () => {
      try {
          const storedWorkouts = await AsyncStorage.getItem('workouts');
          if (storedWorkouts) {
              const parsedWorkouts = JSON.parse(storedWorkouts);

              parsedWorkouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).reverse();
              const workoutsGroupedByDate = groupWorkoutsByDate(parsedWorkouts);
              setWorkoutsByDate(workoutsGroupedByDate);
          }
      } catch (error) {
          console.error('Inside Home component!! Error fetching workouts:', error);
      }
    };

    const groupWorkoutsByDate = (workouts) => {
      const groupedWorkouts = {};
      workouts.forEach(workout => {
          const date = workout.date;
          if (!groupedWorkouts[date]) {
              groupedWorkouts[date] = [];
          }
          groupedWorkouts[date].push(workout);
      });
      return groupedWorkouts;
    };

    const deleteWorkout = async (date, index) => {
      try {
        const updatedWorkouts = [...workoutsByDate[date]];
        updatedWorkouts.splice(index, 1);
        const updatedWorkoutsByDate = { ...workoutsByDate, [date]: updatedWorkouts };
        setWorkoutsByDate(updatedWorkoutsByDate);
        await AsyncStorage.setItem('workouts', JSON.stringify(getAllWorkouts(updatedWorkoutsByDate)));
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    };

    const getAllWorkouts = (workoutsByDate) => {
        const allWorkouts = [];
        Object.values(workoutsByDate).forEach(workouts => {
            allWorkouts.push(...workouts);
        });
        return allWorkouts;
    };

  return (
    <View style={styles.container}>
      <ScrollView>
        {Object.entries(workoutsByDate).map(([date, workouts]) => (
          <View key={date}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{date}</Text>
            </View>
            {workouts.map((workout, index) => (
                <View key={index} style={styles.workoutContainer}>
                  <TouchableOpacity key={`${date}-${index}`} onPress={() => toggleShowNotes(date, index)}>
                    <Icon
                      name={showNotes[date]?.[index] ? 'chevron-up-outline' : 'chevron-down-outline'}
                      style={styles.arrowIcon}
                    />
                  </TouchableOpacity>
                  <View style={styles.workoutTextContainer}>
                    <View style={styles.workoutHeader}>
                      <Text style={styles.workoutTitle}>{workout.name}</Text>
                    </View>
                    {workout.type === 'weightRep' && (
                      <View style={styles.detailsContainer}>
                      <Text style={styles.workoutDetails}>Weight: {workout.weight} kg</Text>
                      <Text style={styles.workoutDetails}>Reps: {workout.reps}</Text>
                      </View>
                    )}
                    {workout.type === 'timeDistance' && (
                      <View style={styles.detailsContainer}>
                      <Text style={styles.workoutDetails}> Time: {workout.time} min</Text>
                      <Text style={styles.workoutDetails}> Distance: {workout.distance} km</Text>
                      </View>
                    )}
                   {showNotes[date]?.[index] &&
                   <View>
                      <View style={styles.underline}/>
                      <Text style={styles.workoutNotes}>Notes: {workout.notes}</Text>
                    </View>
                    }
                  </View>
                  <TouchableOpacity
                    onPress={() => editWorkout(date, index, workout.type)}
                    style={styles.editButton}
                  >
                    <Icon name="pencil" style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        'Delete Workout',
                        'Are you sure you want to delete this workout?',
                        [
                          { text: 'Back' },
                          { text: 'Confirm', onPress: () => deleteWorkout(date, index) },
                        ],
                        { cancelable: false }
                      )
                    }
                    style={styles.deleteButton}
                  >
                    <Icon name="trash" style={styles.deleteIcon} />
                  </TouchableOpacity>
                </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.footerSlot} onPress={bodyWeightTrack}>
          <Icon name="fitness" style={styles.icon} />
          <Text style={styles.footerText}>Weight Log</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerSlot} onPress={addExercise}>
          <Icon name="add-circle" style={styles.icon} />
          <Text style={styles.footerText}>Add Workout</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerSlot} onPress={calorieCalculator}>
          <Icon name="nutrition" style={styles.icon} />
          <Text style={styles.footerText}>Calorie Tool</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerSlot} onPress={routine}>
          <Icon name ="barbell" style={styles.icon}/>
          <Text style={styles.footerText}>Routines</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};