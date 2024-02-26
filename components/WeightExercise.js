import { View, TextInput, TouchableOpacity, Text, ToastAndroid, ToastiOS, Platform, Alert, ScrollView } from 'react-native'
import styles from '../styles/exerciseInput.js'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function WeightExercise({ route }) {
  
    const routes = useRoute();
    const navigation = useNavigation();
    const { exercise } = route.params;
    const [ weight, setWeight ] = useState(0);
    const [ reps, setReps ] = useState(1);
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

    const increaseWeight = () => {
        setWeight(weight + 2.5);
    }

    const decreaseWeight = () => {
        if (weight > 0){
        setWeight(weight - 2.5);
        }
    }

    const increaseReps= () => {
        setReps(reps + 1);
    }
    
    const decreaseReps= () => {
        if (reps > 1){
        setReps(reps - 1);
        }
    }

    const goToChart = () => {
      navigation.navigate('ChartScreen', { exercise: route.params.exercise});
    }

    const saveWorkout = async ( type, name, weight, reps, notes ) => {
      try {
        const existingWorkouts = await AsyncStorage.getItem('workouts');
        let workouts = [];

        if (existingWorkouts) {
          workouts = JSON.parse(existingWorkouts);
      }
    
      const currentDate = new Date().toLocaleDateString('en-GB');
      const workoutData = {
        type: 'weightRep',
        name: exercise,
        weight,
        reps,
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
        console.error('Error saving workout', error);
      }
    };

    const handleSaveWorkout = ( name ) => {
      saveWorkout( 'weightRep', name, weight, reps, notes );
    };

    const clearFields = () => {
      setWeight(0)
      setReps(0)
      setNotes('')
    }

    useEffect(() => {
      const fetchWorkouts = async () => {
        try {
          const storedWorkouts = await AsyncStorage.getItem('workouts');
          if (storedWorkouts) {
            const parsedWorkouts = JSON.parse(storedWorkouts);
            const filterWorkouts = parsedWorkouts.filter(workout =>  workout.name === exercise);
            filterWorkouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setThisWorkout(filterWorkouts);
          }
        } catch (error) {
          console.error('Error fetching workouts:', error);
        }
      };
      fetchWorkouts();
    }, [exercise]);

    const handleWorkoutPress = (index) => {
      
      const newSelectedWorkout = selectedWorkout === index ? -1 : index;
    
      setSelectedWorkout(newSelectedWorkout);
    
      if (newSelectedWorkout === -1) {
        setWeight(0);
        setReps(0);
        setNotes('');
      } else {
        setWeight(thisWorkout[index].weight);
        setReps(thisWorkout[index].reps);
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
              workouts[workoutIndex].weight = weight;
              workouts[workoutIndex].reps = reps;
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
            <TouchableOpacity 
              style={[styles.savedWorkoutContainer, selectedWorkout === index && styles.selectedWorkoutContainer]} 
              key={index} 
              onPress={() => handleWorkoutPress(index)}>
              <View>
                <Text style={styles.workoutText}>Weight: {workout.weight} kg</Text>
                <Text style={styles.workoutText}>Reps: {workout.reps}</Text>
                <Text style={styles.workoutText}>Notes: {workout.notes}</Text>
              </View>
            </TouchableOpacity>
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
            <Text style={styles.numberInputTitle}>Weight</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={decreaseWeight}>
                <Text style={styles.numberInputTitle}>-</Text>
              </TouchableOpacity>
    
              <TextInput
                value={String(weight)}
                keyboardType="numeric"
                style={styles.numberInputField}
                onChangeText={(text) => setWeight(parseInt(text) || 0)}
              />
    
              <TouchableOpacity onPress={increaseWeight}>
                <Text style={styles.numberInputTitle}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
    
          <View style={styles.inputRow}>
            <Text style={styles.numberInputTitle}>Reps</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={decreaseReps}>
                <Text style={styles.numberInputTitle}>-</Text>
              </TouchableOpacity>
    
              <TextInput
                value={String(reps)}
                keyboardType="numeric"
                style={styles.numberInputField}
                onChangeText={(text) => setReps(parseInt(text) || 0)}
              />
    
              <TouchableOpacity onPress={increaseReps}>
                <Text style={styles.numberInputTitle}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

          <TextInput 
            onChangeText={(setNotes)}
            placeholder="Notes"
            placeholderTextColor={'#d9d9d9'}
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

            <TouchableOpacity style={styles.chartButton}onPress={goToChart}>
              <Text style={styles.buttonTitle}>Chart</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {thisWorkout.length > 0 && renderWorkoutByDate()}
          </ScrollView>
        </View>
      );
    };