import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import

interface CustomPickerProps {
    label: string;
    selectedValue: string | number;
    onValueChange: (itemValue: string | number) => void;
    items: Array<{ label: string; value: string | number }>;
    error?: string;
}

const picker: React.FC<CustomPickerProps> = ({ label, selectedValue, onValueChange, items, error }) => {
    return (
        <>
            <View style={styles.container}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.picker}
                >
                    {items.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 0, borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 5
    },
    picker: {
        // height: 50,

    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
});

export default picker;
