import AppConttext from '@/hooks/appContext';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const CartItem = (props) => {
    const [count, setcount] = useState(props.count);
    const { setcart, cart } = useContext(AppConttext)


    const editCart = (count) => {
        const found = cart.find((item) =>
            (item.name === props.name)
        )
        found.count = count;
        setcart([...cart]);
    }




    const handlePlus = () => {
        setcount(count + 1);
        editCart(count + 1);
    }


    const handleMinus = () => {
        if (count > 1) {
            setcount(count - 1);
            editCart(count - 1);
        } else {

        }
    }

    const onCancl = () => {
        const fondIndexincart =
            cart.findIndex((item) =>
                (item.name === props.name)
            );
        cart.splice(fondIndexincart, 1);
        setcart([...cart]);


            



    }


    return (
        <View style={styles.cart}>
            <View style={styles.topContainer}>
                <Image style={styles.image} source={props.imege} />
                {/* <Text>{count}</Text> */}
                <View>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.txt}>Pices: {props.pices}</Text>
                    <Text style={styles.txt}>Players: {props.players}</Text>
                    <Text style={styles.txt}>{props.price}$ * {count} = {props.price * count}$</Text>
                </View>
            </View>

            <View style={styles.counter}>
                <View style={styles.counter}>
                    <TouchableOpacity style={styles.plus} onPress={() => handlePlus()}
                    >
                        <Text style={styles.txtplus}>+</Text>
                    </TouchableOpacity>

                    <View style={styles.plus}>
                        <Text style={styles.txtplus}>{count}</Text>
                    </View>

                    <TouchableOpacity style={styles.plus} onPress={handleMinus}>
                        <Text style={styles.txtplus}>-</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.trash} onPress={onCancl}>
                    <Entypo name="trash" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cart: {
        // backgroundColor: "yellow",
        borderWidth: 2,
        // alignItems: "center",
        // borderColor: "red",
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "80%",
        alignSelf: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 10

    },
    image: {
        height: 100,
        width: 100,
        marginRight: 10,
    },
    counter: {
        flexDirection: "row",
        height: 60,
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
    },
    plus: {
        width: 30,
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        borderRadius: 30,
        marginHorizontal: 2
    },
    txtplus: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    topContainer: {
        flexDirection: 'row',
        flex: 1
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },
    txt: {
        fontSize: 13,
    },
    trash:{
     marginRight:40



    }







})