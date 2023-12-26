import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions, FlatList } from 'react-native';
import styles from '../styles/bodyWeightTrack.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';

export default function WeightTracker()  {
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
            style={styles.weightInput}
            placeholder="Enter your weight"
            placeholderTextColor={'#fff'}
            keyboardType="numeric"
            value={weight}
            onChangeText={(text) => setWeight(text)}
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveWeight}>
            <Text style={styles.buttonTitle}>Save</Text>
        </TouchableOpacity>
      </View>
      {chartData.length > 0 && (
        <LineChart
          style={styles.chart}
          data={{
            labels: chartData.map((data, index) => (index % 5 === 0 ? data.date : '')),
            datasets: [
              {
                data: chartData.map((data) => data.weight),
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={300}
          chartConfig={{
            backgroundGradientFrom: '#121212',
            backgroundGradientTo: '#121212',
            color: (opacity = 1) => `rgba(211, 117, 6, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(204, 204, 204, ${opacity})`,
            strokeWidth: 5,
            decimalPlaces: 1,
          }}
          withVerticalLines={false}
        />
      )}
      <View style={styles.entryContainer}>
        <Text style={styles.entryTitle}>Entries:</Text>
        <FlatList
          data={weightEntries.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).reverse()}
          renderItem={({ item }) => (
            <View style={styles.entryItem}>
            <Text style={styles.entryText}>{item.date}</Text>
            <Text style={styles.entryText}>{item.weight}kg</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          />
      </View>
    </View>
  );
};