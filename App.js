import React, { useState, useEffect  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ImageBackground, Dimensions, TouchableOpacity, BackHandler, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Game from './components/game';
import AwesomeButton, { ThemedButton } from "react-native-really-awesome-button";
import { LinearGradient } from "expo-linear-gradient";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {
  const [showImage, setShowImage] = useState(true);
  const [showImage2, setShowImage2] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0)); // Inicialmente opaco


  useEffect(() => {
    const backAction = () => {
      setShowGame(false); // Cambia el estado para volver a la pantalla de inicio
      return true; // Evita que el evento de volver se propague más
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Inicia la animación de "fade in" cuando el componente se monta
    Animated.timing(fadeAnim, {
      toValue: 1, // Cambia la opacidad a 1
      duration: 500, // Duración de 500ms
      useNativeDriver: true, // Usa el driver nativo para mejor rendimiento
    }).start();

    return () => backHandler.remove();
  }, [fadeAnim, setShowGame]); // Asegúrate de incluir fadeAnim y setShowGame en el array de dependencias


  useEffect(() => {
    // Cambia el estado para ocultar la imagen después de 3 segundos
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage2(false);
    }, 6000);

    return () => clearTimeout(timer); 
  }, []);


  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/Title Theme .wav'),
      { shouldPlay: true, isLooping: true }
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    playSound();
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  const toggleSound = async () => {
    if (sound) {
      if (isPlaying) {
        console.log('Pausing Sound');
        await sound.pauseAsync();
      } else {
        console.log('Resuming Sound');
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };



  
  const renderHomeScreen = () => (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
    <ImageBackground
      source={require('./assets/cargif.gif')} 
      style={styles.background}
      resizeMode="cover" // Cubre todo el fondo sin perder las proporciones
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Best Game</Text>
        <Text style={styles.titleTextGato}>Gato</Text>
      </View>
      <ThemedButton
        progress
        name="bruce" 
        type="anchor"
        style={styles.newgame}
        onPress={() => {setTimeout(() => {setShowGame(true)}, 2500)
        }}
      >
      Nuevo Juego
    </ThemedButton>
   </ImageBackground>
   </Animated.View>
  );
  return (
    <View style={styles.container}>
            {showImage ? (
        // Muestra la imagen durante 3 segundos
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.4)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
        >
        <ImageBackground 
        source={require('./assets/Designer3.png')} 
        style={styles.fullScreenImage} 
        resizeMode="contain"
        />
        </LinearGradient>
      ) : showImage2 ? (
        // Muestra la segunda imagen
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.4)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.background}
        >
          <ImageBackground 
            source={require('./assets/logo1.jpeg')} 
            style={styles.fullScreenImage} 
            resizeMode="contain"
          />
        </LinearGradient>
      ) : (
        <>      
        <TouchableOpacity style={styles.soundButton} onPress={toggleSound}>
          <Ionicons 
            name={isPlaying ? "volume-high" : "volume-mute"} 
            size={24} 
            color="white" 
          />
      </TouchableOpacity>
      <ImageBackground 
        source={require('./assets/tablero.jpg')} 
        style={styles.background2}>
      {!showGame ? renderHomeScreen() : (
      <Animated.View style={{ opacity: fadeAnim }}>
        <Game setShowGame={setShowGame} />
      </Animated.View>
      )}
      <StatusBar style="light" />
      </ImageBackground>
      </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // backgroundColor: 'black',
  },
  background: {
    
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background2: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newgame:{
    position: 'absolute',
    bottom: -300,  
    alignSelf: 'center', 
  },
  soundButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  titleContainer: {
    position: 'absolute',
    top: 80,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: "#ffffff",
    textAlign: 'center',
    textShadowColor: '#00eaff',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
  titleTextGato: {
    fontSize: 72,
    fontWeight: 'bold',
    color: "#ffffff",
    textAlign: 'center',
    textShadowColor: '#ff00f7',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
});


