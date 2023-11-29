import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DisplayWorkouts() {
    const [workoutsByDate, setWorkoutsByDate] = useState({});

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            const storedWorkouts = await AsyncStorage.getItem('workouts');
            if (storedWorkouts) {
                const parsedWorkouts = JSON.parse(storedWorkouts);

                const sortedWorkouts = parsedWorkouts.sort((a, b) => {
                  const dateA = new Date(a.date).getTime();
                  const dateB = new Date(b.date).getTime();
                  return dateB - dateA;
                })
                const workoutsGroupedByDate = groupWorkoutsByDate(sortedWorkouts);
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
        <ScrollView>
            {Object.entries(workoutsByDate).map(([date, workouts]) => (
                <View key={date}>
                    <Text style={styles.date}>{date}</Text>
                    {workouts.map((workout, index) => (
                        <View style={styles.workoutContainer} key={`${date}-${index}`}>
                            <Text>Exercise: {workout.name}</Text>
                            <Text>Date: {workout.date}</Text>
                            <Text>Notes: {workout.notes}</Text>
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
    );
};

const styles = StyleSheet.create({
    date: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
    },
    workoutContainer: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    }
});
