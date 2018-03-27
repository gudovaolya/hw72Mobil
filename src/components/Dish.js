import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const Dish = (props) => {
    return (
        <TouchableOpacity onPress={props.added} style={styles.dish}>
            <Image resizeMode="contain" source={{uri: props.dishImage}} style={styles.image}/>
            <View style={styles.itemText}>
                <Text>{props.title}</Text>
                <Text>Price: {props.price}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    dish: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#eee',
        marginVertical: 5,
        padding: 10
    },
    image: {
        width: '20%',
        height: 50
    },
    itemText: {
        width: '80%',
        paddingLeft: 10

    }
});

export default Dish;