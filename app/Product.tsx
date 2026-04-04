import AppConttext from '@/hooks/appContext'
import { useRouteInfo, useRouter } from 'expo-router/build/hooks'
import React, { useContext, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Product = () => {


    const nav = useRouter()
    const params = useRouteInfo().params
    const [count, setcount] = useState(1);
    const { cart, setcart } = useContext(AppConttext)

    const addTocard = () => {
        const prodact = { ...params, count }
        const found = cart.find((item) =>
            (item.name == params.name)

        );
        if (found) {
            found.count += count;
        }
        else { cart.push(prodact); }




        nav.navigate({
            pathname: "/cart",
            params: prodact
        })

        setcart([...cart])
    }

    const handlePlus = () => {
        setcount(count + 1);
    }

    const handleMinus = () => {
        if (count > 1) {
            setcount(count - 1);
        } else {
            alert("cant be less than 1")
        }
    }


    return (
        <ScrollView style={styles.container}>

            <Image style={styles.img} source={params.imege} />

            <View style={styles.info}>
                <Text style={styles.txt}>{params.name}</Text>
                <Text style={styles.txt}>{params.price}</Text>
            </View>




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
            
            <Text style={styles.total}>Total: {params.price * count}$</Text>

            <TouchableOpacity onPress={addTocard} style={styles.buy}>
                <Text style={styles.txtbuy}>Add to Cart</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.buy}>
                <Text style={styles.txtbuy} >buy</Text>
            </TouchableOpacity> */}
        </ScrollView>
    )
}

export default Product

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        height: 300,
        width: '100%',
        //resizeMode: 'contain'
    },
    info: {
        height: '10%',
        width: '90%',
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 20,
        backgroundColor: 'lightgray',
        elevation: 5,
        alignSelf: 'center',
        borderRadius: 20
    },
    txt: {
        fontSize: 20,
        color: "blue",
        fontWeight: 'bold'
    },
    counter: {
        flexDirection: "row",
        width: "30%",
        height: 60,
        alignItems: 'center',
        alignSelf: 'center',
        
    },
    plus: {
        width: "30%",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        borderRadius: 30,
        marginHorizontal: 2
    },
    txtplus: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    buy: {
        width: "50%",
        height: 50,
        // backgroundColor: 'yellow',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 10 , 
        borderWidth : 2, 
        borderColor:'yellow'
    },
    txtbuy: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue'

    },
    total:{
        fontSize: 16 , 
        marginLeft: 30 , 
        fontWeight:'700', 
        textDecorationLine:'underline'
    }



})