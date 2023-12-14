import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/core'
import Icon from "react-native-vector-icons/Ionicons";

export default function Home() {
    const navigation = useNavigation()
    const [ workoutsByDate, setWorkoutsByDate ] = useState({});
    const [ showNotes, setShowNotes ] = useState({});
  
    const addExercise = () => {
        navigation.navigate("ExerciseGroups")
    }

    const calorieCalculator = () => {
      navigation.navigate("CalorieCalculator")
    }

    const bodyWeightTrack = () => {
      navigation.navigate("Body-weight")
    }

    const routine = () => {
      navigation.navigate("Routines")
    }

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
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#121212',
},
dateContainer: {
  alignItems: 'center',
},
date: {
  fontWeight: 'bold',
  fontSize: 18,
  color: '#fff',
  margin: 5,
},
workoutContainer: {
  flexDirection: 'row',
  borderWidth: 1,
  borderColor: '#333',
  backgroundColor: '#1a1a1a', 
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  marginHorizontal: 10,
  marginBottom:10,
},
workoutTextContainer: {
  flex: 1,
  paddingRight: 10,
},
workoutTitle: {
  color: "#D37506",
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
  paddingVertical: 10,
  borderWidth: 1,
  borderColor: '#333',
},
icon: {
  fontSize: 40,
  color: "#D37506",
},
arrowIcon: {
  fontSize: 30,
  color: "#D37506",
},
detailsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
},
workoutHeader:{
  alignItems: 'center',
},
workoutNotes:{
  color: '#ccc', 
  fontSize: 14,
  marginLeft: 50,
},
underline: {
  backgroundColor: "#D37506",
  height: 1,
  width: '85%',
  margin: 5,
  alignSelf: 'center',
},
footerSlot:{
  alignItems: 'center',
},
footerText: {
  color:'#ccc',
},
});