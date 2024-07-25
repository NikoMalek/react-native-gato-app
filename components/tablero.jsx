import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Cuadro from './cuadro';

function Tablero() {
    const [ cuadros, setCuadros ] = useState(Array(9).fill(null));
    const [ xIsNext, setXisNext ] = useState(true);
    const [winX, setWinX] = useState(0)
    const [winO, setWinO] = useState(0)
    const [notificacion, setNotificacion] = useState('');

    const handleClick = i => {
        const cuadrosTemp = cuadros.slice(); // Copiar el estado de los cuadros
        if (calcularWinner(cuadros) || cuadrosTemp[i]) {
            console.log("WINNER: ", calcularWinner(cuadros));
            if (calcularWinner(cuadros) == null){
                console.log("Casilla Ocupada")
                setNotificacion('Casilla Ocupada')
                setTimeout(() => setNotificacion(''), 2000)
            }

            return;
        }
        cuadrosTemp[i] = xIsNext ? 'X' : 'O'; // Asignar el valor correspondiente al cuadro
        // Mostrar a quien le toca
        setCuadros(cuadrosTemp); // Actualizar el estado de los cuadros
        setXisNext(!xIsNext); // Cambiar el turno
    };


    useEffect(() => {
        const winner = calcularWinner(cuadros);
        if (winner) {
            if (winner == 'X'){
                //agregarle un valor a X
                setWinX(winX + 1)
                console.log("Victorias de X: ",winX)
            }else{
                setWinO(winO + 1)
                console.log("Victorias de O: ",winO)
            }
            Alert.alert(
                'Ganador',
                `El ganador es: ${winner}`,
                [{ text: 'Nuevo Juego', onPress: () => 
                    // llamar la funcion reiniciarJuego()
                    reiniciarJuego()}]
            );
        } else if (cuadros.every(cuadro => cuadro !== null)) {
            Alert.alert(
                'Empate',
                'El juego terminó en empate',
                [{ text: 'Nuevo Juego', onPress: () => reiniciarJuego()}]
            );
        }
    }, [cuadros]);
    // Función para renderizar los cuadros

    function reiniciarJuego(){
        setCuadros(Array(9).fill(null))
        setXisNext(true)
    
    }

    const renderCuadro = i => { 
        return <Cuadro value={cuadros[i]} onPress={() => handleClick(i)} key={i} />;
    };

    const winner = calcularWinner(cuadros);
    let turno;
    if(winner) {
        turno = `Ganador: ${winner}`;
    } else {
        turno = `Siguiente jugador: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.turno}>  {turno}  </Text>
            <View style={styles.tablero}>
                {[...Array(9).keys()].map(i => renderCuadro(i))}
            </View>
            <View style={styles.containerTurno}>
                <Text style={styles.contador}> Contador de Victoria </Text>
                <Text style={styles.contador}> X: {winX}  O: {winO} </Text>
            </View>
            <View style={styles.containerNoti}>
                {notificacion ? <Text style={styles.notificacion}>{notificacion}</Text> : null}
            </View>
        </View>
        
      );
}

function calcularWinner(cuadros) {
    const lineas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lineas.length; i++) {
        const [a, b, c] = lineas[i];
        if (cuadros[a] && cuadros[a] === cuadros[b] && cuadros[a] === cuadros[c]) {
            return cuadros[a];
        }
    }
    return null;
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    turno: {
        fontSize: 24,
        marginBottom: 20,
        color: '#ffffff',
        textShadowColor: '#ffff00',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
        backgroundColor: 'rgba(0, 0, 51, 0.9)',
        borderRadius: 10,
        
    },
    tablero: {
        width: 306,
        height: 306,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: '#ffff00',
        borderWidth: 3,
    },
    contador: {
        fontSize: 24,
        color: "#ffffff",
        textAlign: 'center',
        marginTop: 20,
        textShadowColor: '#00eaff',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
        backgroundColor: 'rgba(0, 0, 51, 0.9)',
        borderRadius: 10,
        
    },
    containerNoti: {
        height: 100,
        marginTop: 20,
    },
    notificacion: {
        fontSize: 20,
        color: "#ffffff",
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgba(128, 128, 128, 0.5)",
        textShadowColor: '#ff00f7',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
    },
    containerTurno: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
      },
});

export default Tablero;