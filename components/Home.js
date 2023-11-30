import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/core'
import Icon from "react-native-vector-icons/Ionicons";

export default function Home() {
    const navigation = useNavigation()
    const [workoutsByDate, setWorkoutsByDate] = useState({});
    const [ showNotes, setShowNotes ] = useState(-1);
  
    const addExercise = () => {
        navigation.navigate("ExerciseGroups")
    }

    const calorieCalculator = () => {
      navigation.navigate("CalorieCalculator")
    }

    const toggleShowNotes = (index) => {
      setShowNotes(showNotes === index ? -1 : index);
    }

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

              parsedWorkouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              const workoutsGroupedByDate = groupWorkoutsByDate(parsedWorkouts);
              setWorkoutsByDate(workoutsGroupedByDate);
          }
      } catch (error) {
          console.error('Error fetching workouts:', error);
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
        console.log('Error deleting workout:', error);
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
              <TouchableOpacity key={`${date}-${index}`} onPress={() => toggleShowNotes(index)}>
                <View style={styles.workoutContainer}>
                  <Icon
                    name={showNotes === index ? 'chevron-up-outline' : 'chevron-down-outline'}
                    style={styles.arrowIcon}
                  />
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
                    {showNotes === index && <Text style={styles.workoutDetails}>Notes: {workout.notes}</Text>}
                  </View>
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
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Icon name="fitness" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={addExercise}>
          <Icon name="add-circle" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={calorieCalculator}>
          <Icon name="nutrition" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#121212',
},
dateContainer: {
  paddingHorizontal: 10,
  alignItems: 'center',
},
date: {
  fontWeight: 'bold',
  fontSize: 18,
  color: '#fff',
  marginBottom: 5,
},
workoutContainer: {
  flexDirection: 'row',
  borderWidth: 1,
  borderColor: '#333',
  backgroundColor: '#1a1a1a', 
  padding: 15,
},
workoutTextContainer: {
  flex: 1,
  paddingRight: 10,
},
workoutTitle: {
  color: '#fff',
  fontSize: 16,
  marginBottom: 5,
},
workoutDetails: {
  color: '#ccc', 
  fontSize: 14,
},
deleteButton: {
  padding: 10,
},
deleteIcon: {
  color: '#ff4d4d',
  fontSize: 25,
},
iconContainer: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#1a1a1a',
  paddingVertical: 15,
},
icon: {
  fontSize: 40,
  color: "#D37506",
},
arrowIcon: {
  fontSize: 25,
  color: "#D37506",
  marginRight: 20,
  marginTop: 10,
},
detailsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
},
workoutHeader:{
  alignItems: 'center',
},
});