import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/Ionicons";

export default function CalorieCalculator() {
    
    const [gender, setGender] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [age, setAge] = useState('')
    const [activity, setActivity] = useState(0)
    const [step, setStep] = useState(1)
    const [calories, setCalories] = useState(0)

    const activityLevels = [
        { name: 'Sedentary: little to no exercise', constant: 1.2},
        { name: 'Light: exercise 1-3 times/week', constant: 1.375},
        { name: 'Moderate: exercise 4-5 times/week', constant: 1.55},
        { name: 'Active: exercise daily', constant: 1.725},
        { name: 'Very Active: intense exercise daily', constant: 1.9}
    ];

    const handleGenderSelection = (selectedGender) => {
        setGender(selectedGender);
    };


    const handleNextStep = () => {
        if (step === 1 && gender !== '') {
            setStep(step + 1);
        } else if (step === 2 && (weight !== '' || height !== '' || age !== '')) {
            setStep(step + 1);
        } else if (step === 3 && activity !== 0) {
            calculateCalories();
            setStep(step + 1);
        };
    }

    const handleStepBack = () => {
            setStep(step -1);
    };

    const handleActivitySelection = (constant) => {
        setActivity(constant);
    }; 

    const calculateCalories = () => {
        const numericWeight = parseFloat(weight);
        const numericHeight = parseFloat(height);
        const numericAge = parseFloat(age);
        let bmr = 0;
        if (gender === 'male') {
            bmr = 66.473 + (numericWeight * 13.7516) + (numericHeight * 5.0033) - (numericAge * 6.755);
        } else if (gender === 'female') {
            bmr = 655.0955 + (numericWeight * 9.5634) + (numericHeight * 1.8496) - (numericAge * 4.6756);
        }
        const tdee = bmr * activity;
        setCalories(tdee);
    };

  return (
    <View style={styles.container}>
        {step === 1 && (
            <View style={styles.step1}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        gender === 'male' && styles.selectedButtonM,
                    ]}
                    onPress={() => handleGenderSelection('male')}>
                    <Text style={styles.buttonText}>Male</Text>
                    <Icon name="male" style={styles.iconM}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        gender === 'female' && styles.selectedButtonF,
                    ]}
                    onPress={() => handleGenderSelection('female')}>
                    <Text style={styles.buttonText}>Female</Text>
                    <Icon name="female" style={styles.iconF}/>
                </TouchableOpacity>
                <View style={styles.stepContainer1}>
                    <TouchableOpacity
                            style={styles.nextButton}
                            onPress={handleNextStep}>
                            <Icon name="arrow-forward" style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
      )}
        {step === 2 && (
            <View style={styles.step2}>
                <View style={styles.inputContainer}>
                    <TextInput
                    placeholder="Age:"
                    style={styles.inputField}
                    value={age}
                    keyboardType='numeric'
                    onChangeText={(text) => setAge(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Weight:"
                        style={styles.inputField}
                        value={weight}
                        keyboardType='numeric'
                        onChangeText={(text) => setWeight(text)}
                    />
                    <Text style={styles.detailText}>kg</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Height:"
                        style={styles.inputField}
                        value={height}
                        keyboardType='numeric'
                        onChangeText={(text) => setHeight(text)}
                    />
                    <Text style={styles.detailText}>cm</Text>
                </View>
                <View style={styles.stepContainer}>
                    <TouchableOpacity
                            style={styles.nextButton}
                            onPress={handleStepBack}>
                            <Icon name="arrow-back" style={styles.icon}/>
                    </TouchableOpacity>   
                    <TouchableOpacity
                            style={styles.nextButton}
                            onPress={handleNextStep}>
                            <Icon name="arrow-forward" style={styles.icon}/>
                    </TouchableOpacity> 
                </View>
            </View>
      )}
        {step === 3 && (
            <View style={styles.step3}>
                <Text style={styles.step3Title}>Select Activity Level</Text>
                {activityLevels.map((activityLevels, index) => (
                    <TouchableOpacity
                    key={index}
                    style={[
                        styles.activityButton,
                        activity === activityLevels.constant && styles.selectedActivityButton,
                        ]}
                    onPress={() => handleActivitySelection(activityLevels.constant)}
                    >
                    <Text style={styles.activityButtonText}>{activityLevels.name}</Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.stepContainer}>
                    <TouchableOpacity
                            style={styles.nextButton}
                            onPress={handleStepBack}>
                            <Icon name="arrow-back" style={styles.icon}/>
                    </TouchableOpacity>   
                    <TouchableOpacity
                            style={styles.nextButton}
                            onPress={handleNextStep}>
                            <Icon name="arrow-forward" style={styles.icon}/>
                    </TouchableOpacity> 
                </View>
            </View>
      )}
      {step === 4 && (
        <View style={styles.step4}>
            <Text style={styles.result}>Result: {calories.toFixed(0)}</Text>
            <Text style={styles.note}>Note: The calculated calories are an estimate and may vary. Listen to your body's needs and consult a professional for personalized advice.</Text>
            <View style={styles.stepContainer}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleStepBack}>
                    <Icon name="arrow-back" style={styles.icon}/>
                </TouchableOpacity>   
            </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#121212'
    },
    step1:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20,
        position: 'relative',
    },
    button:{
        width: '70%',
        height: '20%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        backgroundColor: '#1a1a1a',
        flexDirection: 'row',
    },
    selectedButtonM:{
        backgroundColor: '#a6d6f5',
    },
    selectedButtonF:{
        backgroundColor: '#fcc7fa',
    },
    nextButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 30,
    },
    icon:{
        fontSize: 50,
        color: '#D37506',
    },
    iconM:{
        fontSize: 50,
        color: '#133b57',
    },
    iconF:{
        fontSize: 50,
        color: '#593658',
    },
    stepContainer1:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
        left: 10,
        right: 10,
    },
    stepContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
    },
    step2:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 30,
    },
    inputField:{
        width: '70%',
        height: 100,
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 40,
        color: 'white',
    },
    detailText:{
        fontSize: 40,
        color: 'white',
        marginHorizontal: 20,
    },
    inputContainer2:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 0,
        marginLeft: 14,
    },
    step3:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    activityButton:{
        backgroundColor: '#D37506',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: '95%',
      },
      activityButtonText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
      },
      step3Title:{
        fontSize: 24,
        color: 'white',
        marginBottom: 14,
      },
      selectedActivityButton:{
        backgroundColor: '#663002',
      },
      step4:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      result:{
        fontSize: 34,
        color: 'white',
      },
      note:{
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#e6dbba',
        padding: 15,
        marginTop: 20,
      },
})