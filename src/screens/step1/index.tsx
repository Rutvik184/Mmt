import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CustomTextInput from '../../components/customTextInput';
import CustomButton from '../../components/customButton';
import StepIndicator from '../../components/stepIndicator';
import { saveStepData } from '../../redux/reducer/fromSlice';

const Step1: React.FC<{ navigation: any }> = ({ navigation }) => {
    const dispatch = useDispatch();
    const step1Data = useSelector((state: any) => state.form.step1);

    const handleSubmit = (values: any) => {
        dispatch(saveStepData({ step: 'step1', data: values }));
        navigation.navigate('Step2');
    };

    return (
        <View style={{ flex: 1 }}>
            <StepIndicator currentStep={0} totalSteps={3} />
            <ScrollView>
                <Formik
                    initialValues={{
                        firstName: step1Data.firstName || '',
                        lastName: step1Data.lastName || '',
                        email: step1Data.email || '',
                        companyName: step1Data.companyName || '',
                        companyWebsite: step1Data.companyWebsite || '',
                        state: step1Data.state || '',
                        zipCode: step1Data.zipCode || '',
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string().required('First Name is required'),
                        lastName: Yup.string().required('Last Name is required'),
                        email: Yup.string().email('Invalid email').required('Email is required'),
                        companyName: Yup.string().required('Company Name is required'),
                        companyWebsite: Yup.string().url('Invalid URL').required('Company Website is required'),
                        state: Yup.string().required('State is required'),
                        zipCode: Yup.string().required('Zip Code is required'),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.container}>
                            <CustomTextInput
                                label="First Name"
                                value={values.firstName}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                error={typeof errors.firstName === 'string' ? errors.firstName : undefined} // Fix
                                touched={touched.firstName == true}
                            />

                            <CustomTextInput
                                label="Last Name"
                                value={values.lastName}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                error={typeof errors.lastName === 'string' ? errors.lastName : undefined} // Fix
                                touched={touched.lastName === true}
                            />

                            <CustomTextInput
                                label="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                error={typeof errors.email === 'string' ? errors.email : undefined} // Fix
                                touched={touched.email == true}
                            />

                            <CustomTextInput
                                label="Company Name"
                                value={values.companyName}
                                onChangeText={handleChange('companyName')}
                                onBlur={handleBlur('companyName')}
                                error={typeof errors.companyName === 'string' ? errors.companyName : undefined} // Fix
                                touched={touched.companyName === true}
                            />

                            <CustomTextInput
                                label="Company Website"
                                value={values.companyWebsite}
                                onChangeText={handleChange('companyWebsite')}
                                onBlur={handleBlur('companyWebsite')}
                                error={typeof errors.companyWebsite === 'string' ? errors.companyWebsite : undefined} // Fix
                                touched={touched.companyWebsite == true}
                            />

                            <CustomTextInput
                                label="State"
                                value={values.state}
                                onChangeText={handleChange('state')}
                                onBlur={handleBlur('state')}
                                error={typeof errors.state === 'string' ? errors.state : undefined} // Fix

                                touched={touched.state == true}
                            />

                            <CustomTextInput
                                label="Zip Code"
                                value={values.zipCode}
                                onChangeText={handleChange('zipCode')}
                                onBlur={handleBlur('zipCode')}
                                error={typeof errors.zipCode === 'string' ? errors.zipCode : undefined} // Fix
                                touched={touched.zipCode == true}
                            />

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
});

export default Step1;
