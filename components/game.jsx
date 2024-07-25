// Archivo de juego gato
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, BackHandler, Animated} from 'react-native';
import Tablero from './tablero';

function Game({ setShowGame }) {
  const [fadeAnim] = useState(new Animated.Value(0)); // Inicialmente opaco
  // Logica de volver a la pantalla inicio cuando se vuelva atras
  useEffect(() => {
    const backAction = () => {
      setShowGame(false); // Cambia el estado para volver a la pantalla de inicio
      return true; // Evita que el evento de volver se propague más
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    Animated.timing(fadeAnim, {
      toValue: 1, // Cambia la opacidad a 1
      duration: 1000, // Duración de 500ms
      useNativeDriver: true, // Usa el driver nativo para mejor rendimiento
    }).start();

    return () => backHandler.remove();
  }, [setShowGame]); // Asegúrate de incluir setShowGame en el array de dependencias




    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.container}>
            <Tablero />
        </View>
      </Animated.View>
    );
}

const styles = StyleSheet.create({
    game: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
export default Game;
