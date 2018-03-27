import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Button, Modal, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getDishes, addDishToCart, placeOrder, orderInit, initCart, removeDishFromCart} from "./src/store/actions";
import Dish from "./src/components/Dish";
import CartItem from "./src/components/CartItem";

class App extends Component {

    state = {
        modalVisible: false
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        this.props.onGetDishes();
    };

    componentDidUpdate() {
        if (this.props.isOrdered) {
            this.props.onOrderInit();
            this.props.onInitCart();
        }
    };

    addToCartHandler = (addedDish) => {
        const dishId = addedDish.key;
        const dish = {
            title: addedDish.title,
            price: addedDish.price
        };
        this.props.onAddDishToCart(dishId, dish)
    };

    orderHandler = (event) => {
        event.preventDefault();
        const dishesToOrder = {};
        Object.keys(this.props.dishesInCart).map(dishId => {
            return (dishesToOrder[dishId] = {
                title: this.props.dishesInCart[dishId].title,
                amount: this.props.dishesInCart[dishId].amount,
                price: this.props.dishesInCart[dishId].price
            });
        });
        this.props.onPlaceOrder(dishesToOrder);
        this.setState({modalVisible: false});
    };


  render() {

      let cart = null;

      if(Object.keys(this.props.dishesInCart).length !== 0){
          let cartItems = (
              Object.keys(this.props.dishesInCart).map(dishId => {
                  return (
                      <CartItem
                          key = {dishId}
                          title = {this.props.dishesInCart[dishId].title}
                          amount = {this.props.dishesInCart[dishId].amount}
                          price = {this.props.dishesInCart[dishId].price * this.props.dishesInCart[dishId].amount}
                          remove = {() => this.props.onRemoveDishFromCart(dishId, this.props.dishesInCart[dishId])}
                      />
                  )
              })
          );

          cart = (
              <View>
                  {cartItems}
                  <View style={styles.cartBot}>
                      <Text>Доставка: 150 KGS</Text>
                      <Text>Итого: {this.props.totalPrice + 150} KGS</Text>
                  </View>
              </View>
          )

      } else {
          cart = (
              <View style={styles.cartBot}>
                  <Text>There are no dishes in your cart yet.</Text>
              </View>
          )
      }

      let priceOrder = 0;

      if (this.props.totalPrice !== 0) {
          priceOrder = this.props.totalPrice + 150;
      }

    return (
      <View style={styles.container}>
          <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                  alert('Modal has been closed.');
              }}
             >
              <View style={{marginTop: 22}}>
                  <View>
                      <Text style={styles.cartTitle}>Order</Text>
                      {cart}
                      <View style={styles.btnWrap}>
                          <TouchableOpacity
                              style={styles.cartBtn}
                              onPress={() => {
                                  this.setModalVisible(!this.state.modalVisible);
                              }}>
                              <Text style={{color: '#fff'}}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              style={styles.cartBtn}
                              onPress={this.orderHandler}>
                              <Text style={{color: '#fff'}}>Order</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </Modal>

          <View style={styles.pageTop}>
              <Text>Tirtle Pizza</Text>
          </View>
          <FlatList
            style={styles.content}
            data={this.props.dishes}
            renderItem={(info) => (
                <Dish
                    title={info.item.title}
                    price={info.item.price}
                    dishImage={info.item.image}
                    added={() => this.addToCartHandler(info.item)}
                />
            )}
          />
          <View style={styles.pageBot}>
              <Text style={styles.pageBotText}>Order Total: {priceOrder} KGS </Text>
              <Button style={styles.btn}
                title="Checkout"
                onPress={() => {
                    this.setModalVisible(true);
                }}
              />
          </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    pageTop: {
        backgroundColor: '#ccc',
        width: '100%',
        padding: 10,
        marginBottom: 10
    },
    content: {
        padding: 10
    },
    pageBot: {
        backgroundColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    pageBotText: {
        flex: 1
    },
    btn: {
        flex: 1,
        backgroundColor: '#24a3ff',
        color: '#fff'
    },
    cartTitle: {
        textAlign: 'center',
        paddingBottom: 10,
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
        color: '#0fc0c8'
    },
    cartBot: {
        marginTop: 10,
        marginBottom: 25,
        paddingHorizontal: 10
    },
    btnWrap: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    cartBtn: {
        backgroundColor: '#24a3ff',
        paddingVertical: 10,
        alignSelf: 'center',
        width: '40%',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        dishesInCart: state.dishesInCart,
        totalPrice: state.totalPrice,
        isOrdered: state.isOrdered
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetDishes: () => dispatch(getDishes()),
        onAddDishToCart: (dishId, dish) => dispatch(addDishToCart(dishId, dish)),
        onPlaceOrder: (order) => dispatch(placeOrder(order)),
        onOrderInit: () => dispatch(orderInit()),
        onInitCart: () => dispatch(initCart()),
        onRemoveDishFromCart: (dishId, dish) => dispatch(removeDishFromCart(dishId, dish))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
