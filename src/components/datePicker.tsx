import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

interface datePickerProps {
    label: string;
    value: string;
    onDateChange: (date: string) => void;
    error?: string;
}

const datePicker: React.FC<datePickerProps> = ({ label, value, onDateChange, error }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        onDateChange(moment(date).format('YYYY-MM-DD')); // Format the date to the desired format
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.inputContainer}>
                <Text style={styles.inputText}>{selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : 'Please select date'}</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}

            {isDatePickerVisible && (
                <DatePicker
                    modal
                    open={isDatePickerVisible}
                    date={selectedDate ? selectedDate : new Date()}
                    onConfirm={handleDateChange}
                    onCancel={hideDatePicker}
                    minimumDate={new Date()}
                    mode='date'
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    inputContainer: {
        borderColor: '#ccc',
        paddingHorizontal: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        borderWidth: 1,
        height: 50,
        justifyContent: 'center'
    },
    inputText: {
        fontSize: 16,
        color: '#555',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default datePicker;
