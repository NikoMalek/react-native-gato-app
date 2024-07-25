import React from "react";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function Cuadro({ value, onPress }) {

    const getNeonStyle = (val) => {
        switch (val) {
            case 'X':
                return styles.neonX;
            case 'O':
                return styles.neonO;
            default:
                return styles.neonEmpty;
        }
    };


    return (
        // <TouchableOpacity onPress={onPress} style={[styles.cuadro, getNeonStyle(value)]}>
        //     <Text style={styles.cuadroTexto}>{value}</Text>
        // </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={[styles.cuadro, getNeonStyle(value)]}>
            <Text style={[styles.cuadroTexto, getNeonStyle(value)]}>{value}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    cuadro: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffff00',
        borderWidth: 1,
        // backgroundColor: '#000033',
        backgroundColor: 'rgba(0, 0, 51, 0.7)',
        opacity: 1,
    },
    neonX: {
        color: '#00eaff',
        textShadowColor: '#00eaff',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
    },
    neonO: {
        color: '#ff00f7',
        textShadowColor: '#ff00f7',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
    },
    neonEmpty: {
        color: 'transparent',
    },
    cuadroTexto: {
        fontSize: 60,
        fontWeight: 'bold',
    },
});

export default Cuadro;