import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    ImageStyle,
    Image,
} from 'react-native';

interface props {
    onPress: () => void;
    customStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    title: string;
    disable?: boolean;
}

const customButtom = ({
    onPress,
    customStyle,
    title,
    titleStyle,
    disable,
}: props) => {
    return (
        <TouchableOpacity
            disabled={disable}
            activeOpacity={0.8}
            onPress={() => {
                onPress();
            }}
            style={[styles.button, customStyle]}>
            <Text style={[styles.ButtonText, titleStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#605c5b',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 12,
        marginTop: 20,
    },
    ButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default customButtom;