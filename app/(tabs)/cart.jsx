import { AntDesign } from '@expo/vector-icons';
import { useRouteInfo, useRouter } from 'expo-router/build/hooks';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CartItem from "../../components/CartItem";
import AppConttext from "../../hooks/appContext";

const Cart = (props) => {
    const params = useRouteInfo().params
    console.log('cart params', params);
    const { cart } = useContext(AppConttext);
    const nav = useRouter()

    const goToPaymaent = () => {
        nav.navigate({
            pathname: "/payment",
            // params: prodact
        })
    }

    const onBuyPress = () => {
        // const result = confirm('Toatal Price: ' + calulate());// 
        // if (result) {
            goToPaymaent()
        // }
    }

    const calulate = () => {
        var sum = 0;
        cart.forEach(element => {
            const totalPerElemnt = element.price * element.count
            sum += totalPerElemnt
        });

        return sum
    }


    const renderItems = () => {
        return (
            cart.map((item, index) => (
                <CartItem
                    imege={item.imege}
                    count={item.count}
                    name={item.name}
                    pices={item.pices}
                    players={item.players}
                    price={item.price}
                />
            ))
        )
    };

    return (
        <View style={styles.container}>
            <Text style={styles.cartTitle}>Cart</Text>

            {cart.length > 0 ?
                <View style={{ flex: 1 }}>
                    <ScrollView style={styles.container}>
                        {renderItems()}

                    </ScrollView>
                    <Text style={styles.total}>Total: {calulate()}$</Text>
                </View>

                :
                <View style={styles.cart}>
                    <AntDesign name="shopping-cart" size={200} color="gray" />
                    <Text style={styles.empty}>
                        cart is empty
                    </Text>
                </View>
            }
            {cart.length && 
            < TouchableOpacity
                style={styles.buyContainer}
                onPress={onBuyPress}
            >

                <Text style={styles.buy}>Buy</Text>
            </TouchableOpacity>}
        </View >
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center"
    },
    buy: {
        color: "yellow",
        fontSize: 30
    },


    buyContainer: {
        alignItems: "center",
        width: "55%",
        alignItems: "center",
        borderColor: "blue",
        // borderWidth: 4,
        paddingRight: 60,
        paddingLeft: 60,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "green",
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom: 25
        // position:'absolute'
    },
    cart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 3,
    },
    empty: {
        fontSize: 50,
        color: 'gray'
    },
    cartTitle: {
        fontSize: 45,
        alignSelf: "center",
        fontWeight: 'bold',
        marginBottom: 20
    },
    total: {
        marginLeft: 50,
        marginTop: 20,
        fontSize: 20,
        fontWeight: '700',
        textDecorationLine: 'underline',
        marginBottom: 20
    }
})