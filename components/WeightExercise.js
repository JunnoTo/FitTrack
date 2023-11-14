import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function WeightExercise() {
    const [ weight, setWeight ] = useState(0);
    const [ reps, setReps ] = useState(0);

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
    

    return (
        <View >
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
        </View>
      );
    };