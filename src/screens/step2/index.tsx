import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { saveStepData } from '../../redux/reducer/fromSlice';
import StepIndicator from '../../components/stepIndicator';
import CustomButton from '../../components/customButton';
import Picker from '../../components/picker';

const fields = ['App Dev.', 'Web Dev.', 'Desktop Dev.', 'E-commerce'];

const Step2: React.FC<{ navigation: any }> = ({ navigation }) => {
    const dispatch = useDispatch();
    const step2Data = useSelector((state: any) => state.form.step2);

    const handleSubmit = (values: any) => {
        dispatch(saveStepData({ step: 'step2', data: values }));
        navigation.navigate('Step3');
    };


    return (
        <View style={{ flex: 1 }}>
            <StepIndicator currentStep={1} totalSteps={3} />
            <ScrollView>
                <Formik
                    initialValues={{
                        workingFields: step2Data.workingFields || [],
                        employees: step2Data.employees || '1-10',
                        wfhPolicy: step2Data.wfhPolicy || '',
                    }}
                    validationSchema={Yup.object().shape({
                        workingFields: Yup.array().min(1, 'Select at least one field'),
                        employees: Yup.string().required('Number of employees is required'),
                        wfhPolicy: Yup.string().required('WFH policy is required'),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
                        <View style={styles.container}>
                            <Text style={styles.label}>Your company is working in:</Text>
                            {fields.map((field) => (
                                <TouchableOpacity
                                    key={field}
                                    style={[
                                        styles.checkbox,
                                        values.workingFields.includes(field) && styles.checkboxSelected,
                                    ]}
                                    onPress={() => {
                                        const newFields = values.workingFields.includes(field)
                                            ? values.workingFields.filter((f: string) => f !== field)
                                            : [...values.workingFields, field];
                                        setFieldValue('workingFields', newFields);
                                    }}
                                >
                                    <Text>{field}</Text>
                                </TouchableOpacity>
                            ))}
                            {touched.workingFields && errors.workingFields && (
                                <Text style={styles.error}>{errors.workingFields}</Text>
                            )}

                            <Text style={styles.label}>Number of Employees:</Text>

                            <Picker items={[
                                { label: '1-10 Employees', value: '1-10' },
                                { label: '10-20 Employees', value: '10-20' },
                                { label: '20-30 Employees', value: '20-30' },
                                { label: '40+ Employees', value: '40+' },
                            ]} onValueChange={(res) => { setFieldValue('employees', res) }} error={touched.employees && errors.employees &&
                                errors.employees
                            } selectedValue={values.employees} />

                            <Text style={styles.label}>Does your company have a WFH policy?</Text>
                            <TouchableOpacity
                                onPress={() => setFieldValue('wfhPolicy', 'yes')}
                                style={[
                                    styles.radio,
                                    values.wfhPolicy === 'yes' && styles.radioSelected,
                                ]}
                            >
                                <Text>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setFieldValue('wfhPolicy', 'no')}
                                style={[
                                    styles.radio,
                                    values.wfhPolicy === 'no' && styles.radioSelected,
                                ]}
                            >
                                <Text>No</Text>
                            </TouchableOpacity>
                            {touched.wfhPolicy && errors.wfhPolicy && (
                                <Text style={styles.error}>{errors.wfhPolicy}</Text>
                            )}

                            <CustomButton onPress={handleSubmit} title="Next" />
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
    checkbox: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
    },
    checkboxSelected: { backgroundColor: '#ddd' },
    radio: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
    },
    radioSelected: { backgroundColor: '#ddd' },
    error: { color: 'red', marginTop: 4 },
});

export default Step2;
