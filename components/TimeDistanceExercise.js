import { View, TextInput, TouchableOpacity, Text, StyleSheet, ToastAndroid, ToastiOS, Platform, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function TimeDistanceExercise({ route }) {

    const routes = useRoute();
    const { exercise } = route.params;
    const [ time, setTime ] = useState(0);
    const [ distance, setDistance ] = useState(0);
    const [ notes, setNotes ] = useState('');
    const [ thisWorkout, setThisWorkout ] = useState([]);
    const [ selectedWorkout, setSelectedWorkout ] = useState(null);
    const [ showTooltip, setShowTooltip ] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 6000);
      return () => clearTimeout(timer);
    }, []);

    const increaseTime = () => {
        setTime(time + 1);
    }

    const decreaseTime = () => {
        if (time > 0   ){
        setTime(time - 1);
        }
    }

    const increaseDistance= () => {
        setDistance(distance + 1);
    }
    
    const decreaseDistance= () => {
        if (distance > 0   ){
        setDistance(distance - 1);
        }
    }

    const saveWorkout = async ( type, name, time, distance, notes ) => {
      try {
        const existingWorkouts = await AsyncStorage.getItem('workouts');
        let workouts = [];

        if (existingWorkouts) {
          workouts = JSON.parse(existingWorkouts);
      }
    
      const currentDate = new Date().toLocaleDateString('en-GB');
      const workoutData = {
        type: 'timeDistance',
        name: exercise,
        time,
        distance,
        notes,
        date: currentDate,
      };

      workouts.push(workoutData);

      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));

      alert('Workout saved!');
      clearFields();

      const storedWorkouts = await AsyncStorage.getItem('workouts');
      if (storedWorkouts) {
        const parsedWorkouts = JSON.parse(storedWorkouts);
        const filterWorkouts = parsedWorkouts.filter(workout => workout.name === exercise);
        setThisWorkout(filterWorkouts);
      }
      } catch (error) {
        console.log('Error saving workout', error);
      }
    };

    const handleSaveWorkout = ( name ) => {
      saveWorkout( 'timeDistance', name, time, distance, notes );
    };

    const clearFields = () => {
      setTime(0)
      setDistance(0)
      setNotes('')
    }

    useEffect(() => {
      const fetchWorkouts = async () => {
        try {
          const storedWorkouts = await AsyncStorage.getItem('workouts');
          if (storedWorkouts) {
            const parsedWorkouts = JSON.parse(storedWorkouts);
            const currentDate = new Date().toLocaleDateString('en-GB');
            const filterWorkouts = parsedWorkouts.filter(workout => workout.name === exercise);
            filterWorkouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setThisWorkout(filterWorkouts);
          }
        } catch (error) {
          console.error('Error fetching workouts:', error);
        }
      };
      fetchWorkouts();
    }, []);
    
    const deleteWorkout = async (date, index) => {
      try {
        const updatedWorkouts = thisWorkout.filter((workout, i) => !(i === index));
        await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
        setThisWorkout(updatedWorkouts);
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    };
    
    const handleWorkoutPress = (index) => {
      
      const newSelectedWorkout = selectedWorkout === index ? -1 : index;
    
      setSelectedWorkout(newSelectedWorkout);
    
      if (newSelectedWorkout === -1) {
        setTime(0);
        setDistance(0);
        setNotes('');
      } else {
        setTime(thisWorkout[index].time);
        setDistance(thisWorkout[index].distance);
        setNotes(thisWorkout[index].notes);
      }
    };

    const updateWorkout = async () => {
      try {
        if (selectedWorkout !== null) {
          const existingWorkout = await AsyncStorage.getItem('workouts');
          if (existingWorkout) {
            let workouts = JSON.parse(existingWorkout);
    
            const workoutIndex = workouts.findIndex(
              (workout) => workout.date === thisWorkout[selectedWorkout].date && workout.name === exercise
            );
    
            if (workoutIndex !== -1) {
              workouts[workoutIndex].time = time;
              workouts[workoutIndex].distance = distance;
              workouts[workoutIndex].notes = notes;
    
              await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
              if(Platform.OS === 'android') {
                ToastAndroid.showWithGravityAndOffset(
                  'Workout updated successfully!',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50
              );
            } else if(Platform.OS === 'ios') {
              ToastiOS.Show('Workout updated successfully!', ToastiOS.LONG);
            }

            const storedWorkouts = await AsyncStorage.getItem('workouts');
            if (storedWorkouts) {
              const parsedWorkouts = JSON.parse(storedWorkouts);
              const filterWorkouts = parsedWorkouts.filter(workout => workout.name === exercise);
              setThisWorkout(filterWorkouts);
            }

            setSelectedWorkout(null);
            clearFields();
          }
        }
      } else if(Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset(
          'Please select an existing workout!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if(Platform.OS === 'ios'){
        ToastiOS.Show('Please select an existing workout!', ToastiOS.LONG);
      }
      } catch(error) {
        console.error('Error updating workout: ', error);
      }
    };

    const renderWorkoutByDate = () => {
      const workoutsByDate = {};

      thisWorkout.forEach(workout => {
        if (!workoutsByDate[workout.date]) {
          workoutsByDate[workout.date] = [];
        }
        workoutsByDate[workout.date].push(workout);
      });
      return Object.entries(workoutsByDate).map(([date, workouts]) => (
        <View key={date}>
          <Text style={styles.dateTitle}>{date}</Text>
          {workouts.map((workout, index) => (
            <View style={[styles.savedWorkoutContainer, selectedWorkout === index && styles.selectedWorkoutContainer]} key={index}>
              <TouchableOpacity onPress={() => handleWorkoutPress(index)}>
                <Text style={styles.workoutText}>Time: {workout.time} kg</Text>
                <Text style={styles.workoutText}>Distance: {workout.distance}</Text>
                <Text style={styles.workoutText}>Notes: {workout.notes}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert(
                'Delete Workout',
                'Are you sure you want to delete this workout?',
                [
                  { text: 'Back' },
                  { text: 'Confirm', onPress: () => deleteWorkout(date, index) },
                ],
                { cancelable: false }
              )} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete Workout</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ));
    };

    return (
      <View style={styles.container}>
        {showTooltip && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>Tap on a workout to update</Text>
          </View>
      )}
        <View style={styles.numberInputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.numberInputTitle}>Time</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={decreaseTime}>
                <Text style={styles.numberInputTitle}>-</Text>
              </TouchableOpacity>
    
              <TextInput
                value={String(time)}
                keyboardType="numeric"
                style={styles.numberInputField}
                onChangeText={(text) => setTime(parseInt(text) || 0)}
              />
    
              <TouchableOpacity onPress={increaseTime}>
                <Text style={styles.numberInputTitle}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
    
          <View style={styles.inputRow}>
            <Text style={styles.numberInputTitle}>Distance</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={decreaseDistance}>
                <Text style={styles.numberInputTitle}>-</Text>
              </TouchableOpacity>
    
              <TextInput
                value={String(distance)}
                keyboardType="numeric"
                style={styles.numberInputField}
                onChangeText={(text) => setDistance(parseInt(text) || 0)}
              />
    
              <TouchableOpacity onPress={increaseDistance}>
                <Text style={styles.numberInputTitle}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

          <TextInput 
            onChangeText={(setNotes)}
            placeholder="Notes:"
            multiline={true}
            style={styles.textInput}
            value={ notes }
          />
          <View style={styles.saveEditButtonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveWorkout}>
              <Text style={styles.buttonTitle}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton}onPress={updateWorkout}>
              <Text style={styles.buttonTitle}>Update</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {thisWorkout.length > 0 && renderWorkoutByDate()}
          </ScrollView>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
      },
      numberInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      inputRow: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      },
      numberInputTitle: {
        color: '#ccc',
        fontSize: 32,
        marginRight: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 5,
      },
      numberInputField: {
        fontSize: 30,
        color: '#ccc',
        width: 100,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#333',
        textAlign: 'center',
        marginHorizontal: 5,
      },
      textInput:{
        fontSize: 18,
        color: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#333',
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
      },
      saveEditButtonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      saveButton: {
        borderWidth: 2,
        backgroundColor: '#FFA726',
        padding: 8,
        borderRadius: 10,
      },
      editButton: {
        borderWidth: 2,
        backgroundColor: '#FF7043',
        padding: 8,
        borderRadius: 10,
      },
      buttonTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
      },
      dateTitle: {
        color: '#FFA726',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
      },
      savedWorkoutContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#1E1E1E',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
      },
      selectedWorkoutContainer: {
        backgroundColor: 'grey', 
      },
      workoutText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#ccc',
      },
      deleteButton: {
        backgroundColor: '#FC4E19', 
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
        marginTop: 5,
      },
      deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
      },
      tooltip: {
        backgroundColor: '#555',
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 999,
      },
      tooltipText: {
        color: '#fff',
        fontSize: 20,
      },
    });