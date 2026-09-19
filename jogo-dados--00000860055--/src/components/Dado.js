import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { imagensDados } from '../app/images';

export default function Dado({ valor }) {
  const imagemFonte = imagensDados[valor] || imagensDados[1];
  return <Image source={imagemFonte} style={styles.imagemDado} resizeMode="contain" />;
}

const styles = StyleSheet.create({
  imagemDado: {
    width: 55,
    height: 55,
    marginHorizontal: 3,
  },
});