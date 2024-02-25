import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import styles from '../styles/chartScreen';

export default function ChartScreen() {
    const route = useRoute();
    const { exercise } = route.params;
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const storedWorkouts = await AsyncStorage.getItem('workouts');
                if (storedWorkouts) {
                    const parsedWorkouts = JSON.parse(storedWorkouts);
                    const filteredWorkouts = parsedWorkouts.filter(workout => workout.name === exercise);
                    setWorkouts(filteredWorkouts);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        fetchWorkouts();
    }, [exercise]);

    const renderChart = () => {
        const weights = workouts.map(workout => workout.weight);
        const dates = workouts.map(workout => workout.date);

        const chartData = {
            labels: dates,
            datasets: [
                {
                    data: weights,
                },
            ],
        };

        return (
            <LineChart
                data={chartData}
                width={400}
                height={300}
                yAxisSuffix="kg" 
                yAxisInterval={1}
                chartConfig={{
                    backgroundGradientFrom: '#121212',
                    backgroundGradientTo: '#121212',
                    color: (opacity = 1) => `rgba(211, 117, 6, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(204, 204, 204, ${opacity})`,
                    strokeWidth: 5,
                    decimalPlaces: 2,
                }}
                bezier
            />
        );
    };
    return (
        <View style={styles.container}>
            {workouts.length > 0 ? (
                renderChart()
            ) : (
                <Text>No workout data available for {exercise}</Text>
            )}
        </View>
    );
}
