import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Card = (props) => {
  const nav = useNavigation();

  const goto = () => {
    // אם במצב עריכה, אל תעבור דף
    if (props.isEditMode) return;
    nav.navigate("Product", { ...props });
  };

  return (
    <View style={styles.container}>
      {/* כפתור המחיקה - מופיע רק במצב עריכה */}
      {props.isEditMode && (
        <TouchableOpacity style={styles.deleteIcon} onPress={() => props.onDelete(props._id, props.name)}>
          <MaterialCommunityIcons name="minus-circle" size={26} color="#ff4d4d" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.card, props.isEditMode && styles.editCardBorder]}
        onPress={goto}
        activeOpacity={props.isEditMode ? 1 : 0.7}
      >
        <Image style={styles.img} source={props.imege} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{props.name}</Text>
          <Text style={styles.price}>{props.price}$</Text>
          <Text style={styles.originPrice}>{(props.price * 1.2).toFixed(2)}$</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  card: {
    height: 100,
    width: "95%",
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  editCardBorder: {
    borderWidth: 1,
    borderColor: '#ffc107',
    borderStyle: 'dashed'
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    left: 4,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  img: {
    height: 80,
    width: 80,
    backgroundColor: '#f0f0f0',
    marginRight: 15,
    borderRadius: 8
  },
  info: {
    flex: 1,
    justifyContent: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  price: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600'
  },
  originPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: 'gray'
  }
});