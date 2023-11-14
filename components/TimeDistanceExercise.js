import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function TimeDistanceExercise() {
    const [ time, setTime ] = useState(0);
    const [ distance, setDistance ] = useState(0);

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
    

    return (
        <View >
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
        </View>
      );
    };