import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

interface StepIndicatorProps {
    currentStep: number; // The current step (1, 2, or 3)
    totalSteps: number; // The total number of steps
}

const stepIndicator: React.FC<StepIndicatorProps> = ({
    currentStep,
    totalSteps,
}) => {
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013',
    };


    return (
        <View style={styles.constainer}>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={currentStep}
                stepCount={totalSteps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    constainer: { marginTop: 16 },

});

export default stepIndicator;