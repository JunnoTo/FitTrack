import { View, TextInput, TouchableOpacity, Text, StyleSheet, ToastAndroid, ToastiOS, Platform, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';



export default function WeightExercise({ route }) {
  
    const routes = useRoute();
    const { exercise } = route.params;
    const [ weight, setWeight ] = useState(0);
    const [ reps, setReps ] = useState(0);
    const [ notes, setNotes ] = useState('');
    const [ thisWorkout, setThisWorkout ] = useState([]);
    const [ selectedWorkout, setSelectedWorkout ] = useState(null);

    const increaseWeight = () => {
        setWeight(weight + 1);
    }

    const decreaseWeight = () => {
        if (weight > 0   ){
        setWeight(weight - 1);
        }
    }

    const increaseReps= () => {
        setReps(reps + 1);
    }
    
    const decreaseReps= () => {
        if (reps > 0   ){
        setReps(reps - 1);
        }
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
        const filterWorkouts = parsedWorkouts.filter(workout => workout.date === currentDate && workout.name === exercise);
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
    
    const deleteWorkout = async (date, index) => {
      try {
        const updatedWorkouts = thisWorkout.filter((workout, i) => !(i === index && workout.date === date));
        await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
        setThisWorkout(updatedWorkouts);
      } catch (error) {
        console.log('Error deleting workout:', error);
      }
    };

    const handleWorkoutPress = (index) => {
      setSelectedWorkout(index);

      setWeight(thisWorkout[index].weight);
      setReps(thisWorkout[index].reps);
      setNotes(thisWorkout[index].notes);
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
              clearFields();
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
            const updatedWorkout = workouts[workoutIndex];
            setThisWorkout(workouts);
            setSelectedWorkout(null);
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
                    <TouchableOpacity
                        onPress={() => handleWorkoutPress(index)}>
                        <Text>Weight: {workout.weight} kg</Text>
                        <Text>Reps: {workout.reps} </Text>
                        <Text>Notes: {workout.notes}</Text>
                    </TouchableOpacity>
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
    ));
};

    return (
        <View style={styles.container}>
          <Text>Weight: </Text>
          <TouchableOpacity  onPress={decreaseWeight}>
              <Text>-</Text>
          </TouchableOpacity>

          <TextInput
            value={String(weight)}
            keyboardType="numeric"
            onChangeText={(text) => setWeight(parseInt(text) || 0)}
            />

          <TouchableOpacity  onPress={increaseWeight}>
            <Text>+</Text>
          </TouchableOpacity>

          <Text>Reps: </Text>
          <TouchableOpacity  onPress={decreaseReps}>
            <Text>-</Text>
          </TouchableOpacity>
          
          <TextInput
            value={String(reps)}
            keyboardType="numeric"
            onChangeText={(text) => setReps(parseInt(text) || 0)}
            />
            
          <TouchableOpacity  onPress={increaseReps}>
            <Text>+</Text>
          </TouchableOpacity>

          <Text>Notes:</Text>
          <TextInput 
            onChangeText={(setNotes)}
            value={ notes }
          />

          <TouchableOpacity onPress={handleSaveWorkout}>
            <Text>Save Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={updateWorkout}>
            <Text>Update Workout</Text>
          </TouchableOpacity>

          <ScrollView>
            {thisWorkout.length > 0 && renderWorkoutByDate()}
          </ScrollView>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container:{
        flex: 1,
        padding: 10,
      },
      savedWorkoutContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
      },
      selectedWorkoutContainer: {
        backgroundColor: 'grey'
      }
    });