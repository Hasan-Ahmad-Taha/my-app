// import { useState } from 'react'
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import Search from '../components/Search'

// const UseState = () => {
//     const [first, setfirst] = useState("mosa")
//     const [color, setColor] = useState("black")


//     const OnPressName = (name, color) => {
//         setfirst(name)
//         setColor(color)
//     }

//     return (
//         <View style={styles.screen}>
//             <Text>this is first:</Text>

//             <Text style={{ color: color }}>{first}</Text>
//             <TouchableOpacity style={styles.nseem}
//                 onPress={() => OnPressName("nseem", "blue")}>
//                 <Text>nseem</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.hasan}
//                 onPress={() => OnPressName("hasan", "yellow")}>
//             <Text>hasan</Text>
//             </TouchableOpacity>
//           <Search />
          
//         </View>
//     )
// }

// export default UseState

// const styles = StyleSheet.create({

//     screen: {
//         backgroundColor: "gray",
//         flex: 1,
//     },
//     nseem: {
//         backgroundColor: "blue",
//         padding: 10,
//         margin: 10,
//     },
//     hasan: {
//         backgroundColor: "yellow",
//         padding: 10,
//         margin: 10,

//     }



// })