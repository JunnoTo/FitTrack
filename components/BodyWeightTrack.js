import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';

const WeightTracker = () => {
  const [weight, setWeight] = useState('');
  const [weightEntries, setWeightEntries] = useState([]);

  useEffect(() => {
    loadWeightEntries();
  }, []);

  const loadWeightEntries = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem('weightEntries');
      if (storedEntries !== null) {
        setWeightEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error('Error loading weight entries: ', error);
    }
  };

  const saveWeight = async () => {
    try {
      if (!weight) {
        Alert.alert('Please enter your weight.');
        return;
      }

      const currentDate = new Date().toLocaleDateString('en-GB');

      const newEntry = {
        weight,
        date: currentDate,
      };

      const updatedEntries = [...weightEntries, newEntry];

      await AsyncStorage.setItem('weightEntries', JSON.stringify(updatedEntries));
      Alert.alert('Weight saved successfully!');
      setWeightEntries(updatedEntries);
      setWeight('');
    } catch (error) {
      console.error('Error saving weight: ', error);
    }
  };

  const chartData = weightEntries.map((entry) => ({
    date: entry.date,
    weight: parseFloat(entry.weight),
  }));


  return (
    <View>
        <TextInput
            placeholder="Enter your weight"
            keyboardType="numeric"
            value={weight}
            onChangeText={(text) => setWeight(text)}
        />
        <TouchableOpacity onPress={saveWeight}>
            <Text>Save</Text>
        </TouchableOpacity>

      {chartData.length > 0 && (
        <LineChart
          data={{
            labels: chartData.map((data, index) => (index % 3 === 0 ? data.date : '')),
            datasets: [
              {
                data: chartData.map((data) => data.weight),
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 120, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            decimalPlaces: 1,
          }}
          withVerticalLines={false}
        />
      )}
    </View>
  );
};

export default WeightTracker;
