import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions, FlatList, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weightInput: {
    fontSize: 26,
    color: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#333',
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  saveButton: {
    borderWidth: 2,
    backgroundColor: '#FFA726',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  entryContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333'
  },
  entryTitle: {
    color: '#fff',
    fontSize: 26,
  },
  entryText: {
    color : '#fff',
    fontSize: 18,
  },
  entryItem: {
    width: 300,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
});