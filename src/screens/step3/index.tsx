import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { saveStepData, submitForm, resetForm } from '../../redux/reducer/fromSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../components/customTextInput';
import CustomDatePicker from '../../components/datePicker';
import StepIndicator from '../../components/stepIndicator';
import CustomButton from '../../components/customButton';
import { CommonActions } from '@react-navigation/native';

const PLANS = {
    Monthly: { Gold: 50, Titanium: 100 },
    Yearly: { Gold: 500, Titanium: 1000 },
};

const Step3: React.FC<{ navigation: any }> = ({ navigation }) => {
    const dispatch = useDispatch();
    const step3Data = useSelector((state: any) => state.form.step3);
    let [disable, setdisable] = useState(false)

    const handleSubmit = (values: any) => {
        setdisable(true)
        const finalPrice = values.planPrice * values.userCount;
        const formData = { ...values, finalPrice, planPrice: values.planPrice };
        dispatch(saveStepData({ step: 'step3', data: formData }));
        dispatch(submitForm());
        dispatch(resetForm());
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'OrderSummary' }],
            })
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <StepIndicator currentStep={2} totalSteps={3} />
            <ScrollView>
                <Formik
                    initialValues={step3Data}
                    validationSchema={Yup.object().shape({
                        startPlanDate: Yup.string().required('Start plan date is required'),
                        userCount: Yup.number().required('User count is required'),
                        planPrice: Yup.number().required('Please select a plan').min(10, 'Please select a plan'), // Add validation for plan selection
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
                        <View style={styles.container}>
                            {/* Date Picker */}
                            <CustomDatePicker
                                label="Start Plan Date"
                                value={values.startPlanDate}
                                onDateChange={(date) => setFieldValue('startPlanDate', date)}
                                error={touched.startPlanDate && errors.startPlanDate}
                            />

                            {/* User Count Input */}
                            <CustomTextInput
                                label="Number of Users"
                                placeholder="Enter number of users"
                                keyboardType="numeric"
                                value={values.userCount?.toString()}
                                onChangeText={handleChange('userCount')}
                                onBlur={handleBlur('userCount')}
                                error={typeof errors.userCount === 'string' ? errors.userCount : undefined} // Fix
                                touched={touched.userCount == true}

                            />

                            {/* Plan Selection */}
                            <Text style={styles.label}>Select Plan:</Text>
                            <View style={styles.planContainer}>
                                {Object.keys(PLANS).map((type) =>
                                    Object.keys(PLANS[type]).map((level) => (
                                        <TouchableOpacity
                                            key={`${type}-${level}`}
                                            style={[
                                                styles.planButton,
                                                values.planPrice === PLANS[type][level] && styles.selectedPlan, // Highlight selected plan
                                            ]}
                                            onPress={() => setFieldValue('planPrice', PLANS[type][level])}
                                        >
                                            <Text style={{ fontWeight: '600', fontSize: 16 }}>
                                                ${PLANS[type][level]}/{type}
                                            </Text>
                                            <Text style={{ fontWeight: '400', fontSize: 12 }}>
                                                {level}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                )}
                            </View>

                            {/* Error for plan selection */}
                            {touched.planPrice && errors.planPrice && <Text style={styles.errorText}>{errors.planPrice}</Text>}

                            {values?.planPrice && values?.userCount ? <Text style={styles.label}>Order Price: <Text>{values.planPrice * values.userCount}</Text></Text> : null}

                            {/* Submit Button */}
                            <CustomButton disable={disable} onPress={handleSubmit} title="Submit" />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    label: { fontSize: 16, marginBottom: 8 },
    planContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, alignItems: 'center', justifyContent: 'space-between' },
    planButton: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        width: '45%',
        alignItems: 'center', justifyContent: 'center'
    },
    selectedPlan: {
        backgroundColor: '#cce7ff', // Highlight selected plan with a different background color
        borderColor: '#007BFF',
    },
    errorText: { color: 'red', fontSize: 12 },
});

export default Step3;
