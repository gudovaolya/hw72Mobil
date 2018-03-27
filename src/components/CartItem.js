import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemTitle}>{props.title} x&nbsp;{props.amount}</Text>
            <Text style={styles.cartItemPrice}>Price: {props.price}</Text>
            <TouchableOpacity onPress={props.remove} style={styles.btnDelete}>
                <Text style={{color: '#8b0000'}}>x</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
   cartItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#6fbbc8'
    },
    cartItemTitle: {
      paddingTop: 5,
      paddingBottom: 8,
      paddingRight: 20,
      width: '50%'
    },
    cartItemPrice: {
        paddingTop: 5,
        paddingBottom: 8,
        paddingRight: 20,
        width: '25%'
    },
    btnDelete: {
        width: 30,
        height: 30,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#cc6f72'
    }
});

export default CartItem;