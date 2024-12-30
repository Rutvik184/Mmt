import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetForm, saveStepData } from '../../redux/reducer/fromSlice';
import CustomButton from '../../components/customButton';
import moment from 'moment';
import { styles } from './styles';

const orderSummary: React.FC<{ navigation: any }> = ({ navigation }) => {
    const dispatch = useDispatch();

    const submissions = useSelector((state: any) => state.form.submittedForms);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => {
            dispatch(saveStepData({
                step: 'step1', data: {
                    firstName: item.firstName || '',
                    lastName: item.lastName || '',
                    email: item.email || '',
                    companyName: item.companyName || '',
                    companyWebsite: item.companyWebsite || '',
                    state: item.state || '',
                    zipCode: item.zipCode || '',
                },
                id: item.id
            }));
            navigation.navigate('Step1')
            dispatch(saveStepData({
                step: 'step3', data: {
                    startPlanDate: item?.startPlanDate || '',
                    userCount: item?.userCount || 1,
                    finalPrice: item?.finalPrice || 0,
                    planPrice: item?.planPrice || 0
                },
                id: item.id
            }));
            dispatch(saveStepData({
                step: 'step2', data: {
                    workingFields: item?.workingFields || [],
                    employees: item?.employees || '',
                    wfhPolicy: item?.wfhPolicy || '',
                },
                id: item.id
            }));
        }} style={styles.item}>
            <Text style={styles.title}>Plan: {item.planPrice ? `$${item.planPrice}` : 'None'}</Text>
            <Text style={{ color: 'black', fontSize: 14 }}>Start Date : <Text style={{ fontWeight: '600' }}>{moment(item.startPlanDate).format('YYYY-MM-DD')}</Text></Text>
            <Text style={{ color: 'black', fontSize: 14 }}>Number of Users : <Text style={{ fontWeight: '600' }}>{item.userCount}</Text></Text>
            <Text style={{ color: 'black', fontSize: 14 }}>Final Price : <Text style={{ fontWeight: '600' }}>${item.finalPrice}</Text></Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Submitted Forms</Text>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={submissions}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* Buttons to Reset Form or Add New Submission */}
            <CustomButton title="Add New Form" onPress={() => {
                dispatch(resetForm())
                navigation.navigate('Step1')
            }} />
        </View>
    );
};



export default orderSummary;
