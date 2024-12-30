import React from 'react';
import { View, TextInput as RNTextInput, Text, StyleSheet, TextInputProps } from 'react-native';

interface customTextInputProps extends TextInputProps {
    label?: string;
    error?: string;
    touched?: boolean;
}

const customTextInput: React.FC<customTextInputProps> = ({
    label,
    error,
    touched,
    ...props
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <RNTextInput style={styles.input} {...props} placeholder={`Enter ${label}`} />
            {touched === true && typeof error === 'string' && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    label: { fontSize: 16, marginBottom: 4, color: '#333' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        fontSize: 14,
        height: 50,
        justifyContent: 'center',
        color: 'black'
    },
    error: { color: 'red', marginTop: 4 },
});

export default customTextInput;
