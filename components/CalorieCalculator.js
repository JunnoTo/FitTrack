import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function CalorieCalculator() {
    
    const [gender, setGender] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [age, setAge] = useState('')
    const [activity, setActivity] = useState(0)
    const [step, setStep] = useState(1)
    const [calories, setCalories] = useState(0)

    let menBMRConstant = 66.473;
    let menWeightConstant = 13.7516;
    let menHeightConstant = 5.0033;
    let menAgeConstant = 6.755;

    let womenBMRConstant = 655.0955;
    let womenWeightConstant = 9.5634;
    let womenHeightConstant = 1.8496;
    let womenAgeConstant = 4.6756;

    const activityLevel = [
        { name: 'Sedentary', constant: 1.2},
        { name: 'Ligtly Active', constant: 1.375},
        { name: 'Moderate Active', constant: 1.55},
        { name: 'Very Active', constant: 1.725},
        { name: 'Extremely Active', constant: 1.9}
    ];


    const handleNextStep = () => {
        if (step === 1 && gender !== '') {
            setStep(step + 1);
            console.log(gender);
        } else if (step === 2 && weight !== '') {
            setStep(step + 1);
            console.log(weight);
        } else if (step === 3 && height !== '') {
            setStep(step + 1);
            console.log(height);
        } else if (step === 4 && age !== '') {
            setStep(step + 1);
            console.log(age);
        } else if (step === 5 && activity !== 0) {
            calculateCalories();
            setStep(step + 1);
        };
    }
    const handleActivitySelection = (constant) => {
        setActivity(constant);
        console.log(constant);
    }; 

    const calculateCalories = () => {
        console.log('We have now reached the calorie calculator');
        const numericWeight = parseFloat(weight);
        const numericHeight = parseFloat(height);
        const numericAge = parseFloat(age);
        let bmr = 0;
        if (gender ==='male') {
            bmr = menBMRConstant + (numericWeight * menWeightConstant) + (numericHeight * menHeightConstant) - (numericAge * menAgeConstant);
        } else if (gender === 'female') {
            bmr = womenBMRConstant + (numericWeight * womenWeightConstant) + (numericHeight * womenHeightConstant) - (numericAge * womenAgeConstant);
        };
        console.log(numericWeight, numericHeight, numericAge, activity);
        const tdee = bmr * activity;
        setCalories(tdee);
        };

  return (
    <View>
        {step === 1 && (
            <View>
                <Text>Gender: </Text>
                <TouchableOpacity onPress={() => setGender('male')}>
                    <Text>Male</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setGender('female')}>
                    <Text>Female</Text>
                </TouchableOpacity>

                <Button title="Next" onPress={handleNextStep} />
            </View>
      )}
        {step === 2 && (
            <View>
                <Text>Step 2: Enter Weight</Text>
                <TextInput
                    placeholder="Enter Weight"
                    value={weight}
                    keyboardType='numeric'
                    onChangeText={(text) => setWeight(text)}
                />
                <Button title="Next" onPress={handleNextStep} />
            </View>
      )}
        {step === 3 && (
            <View>
            <Text>Step 3: Enter Height</Text>
            <TextInput
                placeholder="Enter Height"
                value={height}
                keyboardType='numeric'
                onChangeText={(text) => setHeight(text)}
                />
            <Button title="Next" onPress={handleNextStep} />
        </View>
      )}
        {step === 4 && (
        <View>
            <Text>Step 4: Enter Age</Text>
            <TextInput
                placeholder="Enter Age"
                value={age}
                keyboardType='numeric'
                onChangeText={(text) => setAge(text)}
            />
            <Button title="Next" onPress={handleNextStep} />
        </View>
      )}
        {step === 5 && (
        <View>
          <Text>Step 5: Select Activity Level</Text>
          {activityLevel.map((activityLevel, index) => (
            <Button
              key={index}
              title={activityLevel.name}
              onPress={() => handleActivitySelection(activityLevel.constant)}
            />
          ))}
          <Button title="Next" onPress={handleNextStep} />
        </View>
      )}
      {step === 6 && (
        <View>
            <Text>Step 6: Calculated Calories</Text>
            <Text>Calories: {calories}</Text>
        </View>
      )}
    </View>
  )
}