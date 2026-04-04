import { Feather } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'

const Search = (props) => {
    return (
        <View style={styles.search}>
            <TextInput
                onChangeText={text => props?.Searchdata?.(text) || {}}
                placeholder="search"
                style={styles.TextInput}
            />
            <Feather name="search" size={24} color="black" />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({

    search: {
        marginLeft: 10,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "space-between",
        width: "90%",
        height: 35,
        borderRadius: 10,
        alignSelf: 'center' , 
        paddingRight: 10
    },

    searchTxt: {
        marginLeft: 2,
    },
    TextInput: {
        flex: 1,
        height: "100%",
        paddingLeft : 10
    }



})