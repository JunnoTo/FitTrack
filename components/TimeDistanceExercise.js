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
        const filterWorkouts = parsedWorkouts.filter(workout => workout.date === currentDate && workout.name === exercise);
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
        const updatedWorkouts = thisWorkout.filter((workout, i) => !(i === index && workout.date === date));
        await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
        setThisWorkout(updatedWorkouts);
      } catch (error) {
        console.log('Error deleting workout:', error);
      }
    };
    

    const handleWorkoutPress = (index) => {
      if(selectedWorkout === index){
        setSelectedWorkout(null);
        setTime(0);
        setDistance(0);
        setNotes('');
      } 
      else{
        setSelectedWorkout(index);
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
                        <Text>Time: {workout.time} minutes</Text>
                        <Text>Distance: {workout.distance} km</Text>
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
          <Text>Time: </Text>
          <TouchableOpacity  onPress={decreaseTime}>
              <Text>-</Text>
          </TouchableOpacity>

          <TextInput
            value={String(time)}
            keyboardType="numeric"
            onChangeText={(text) => setTime(parseInt(text) || 0)}
            />

          <TouchableOpacity  onPress={increaseTime}>
            <Text>+</Text>
          </TouchableOpacity>

          <Text>Distance: </Text>
          <TouchableOpacity  onPress={decreaseDistance}>
            <Text>-</Text>
          </TouchableOpacity>
          
          <TextInput
            value={String(distance)}
            keyboardType="numeric"
            onChangeText={(text) => setDistance(parseInt(text) || 0)}
            />
            
          <TouchableOpacity  onPress={increaseDistance}>
            <Text>+</Text>
          </TouchableOpacity>

          <Text>Notes: </Text>
          <TextInput
            onChangeText={( setNotes )}
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
        padding:10,
      },
      savedWorkoutContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
      },
      selectedWorkoutContainer: {
        backgroundColor: 'grey'
      },
    });