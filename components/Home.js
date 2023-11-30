import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/core'
import Icon from "react-native-vector-icons/Ionicons";

export default function Home() {
    const navigation = useNavigation()
    const [workoutsByDate, setWorkoutsByDate] = useState({});
  
    const addExercise = () => {
        navigation.navigate("ExerciseGroups")
    }

    const calorieCalculator = () => {
      navigation.navigate("CalorieCalculator")
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
      <ScrollView style={styles.scrollContainer}>
          {Object.entries(workoutsByDate).map(([date, workouts]) => (
              <View key={date}>
                  <Text style={styles.date}>{date}</Text>
                  {workouts.map((workout, index) => (
                      <View style={styles.workoutContainer} key={`${date}-${index}`}>
                          <Text>{workout.name}</Text>
                          {workout.type === 'weightRep' && (
                            <View>
                              <Text>Weight: {workout.weight} </Text>
                              <Text>Reps: {workout.reps} </Text>
                            </View>
                          )}
                          {workout.type === 'timeDistance' && (
                            <View>
                              <Text>Time: {workout.time}</Text>
                              <Text>Distance: {workout.distance}</Text>
                            </View>
                          )}
                          <TouchableOpacity onPress={() => Alert.alert(
                              'Delete Workout',
                              'Are you sure you want to delete this workout?',
                              [
                                  { text: 'Back' },
                                  { text: 'Confirm', onPress: () => deleteWorkout(date, index) },
                              ],
                              { cancelable: false }
                          )}>
                              <Text>Delete Workout</Text>
                          </TouchableOpacity>
                      </View>
                  ))}
              </View>
          ))}
      </ScrollView>
        <View style={styles.iconContainer}>

          <TouchableOpacity>
            <Icon
              name="fitness"
              aria-label="Body weight"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={ addExercise }>
            <Icon
              name="add-circle"
              aria-label="Add Exercise"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={ calorieCalculator }>
            <Icon
              name="nutrition"
              aria-label="Calorie calculator"
              style={styles.icon}
            />
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    marginBottom: 70,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  workoutContainer: {
    flex:1,
    borderWidth: 1,
    padding: 10,
  },
  iconContainer:{
    width: Dimensions.get('window').width,
    position:'absolute',
    bottom: 0,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ADA7A7',
    paddingBottom: 10,
  },
  icon:{
    fontSize: 60,
    color: "#D37506",
  },
});