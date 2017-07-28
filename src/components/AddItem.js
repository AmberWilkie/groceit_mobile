import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View,  } from 'react-native';
import { Button, Container, Content, Form, Item, TextInput, Input, Picker } from 'native-base';

class AddModal extends Component {
  state = {
    modalVisible: false,
    name: '',
    quantity: 0,
    category: ''
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };

  render() {
    const updateQuantity = (action) => {
      console.log('quantity button clicked ', action);
      switch (action) {
        case 'add':
          this.setState( prevState => ({
            quantity: prevState.quantity + 1,
            something: 'a thing'
          }))
          break;
        case 'minus':
          this.setState( prevState => ({
            quantity: prevState.quantity - 1
          }))
          break;
        default:
          return true;
      }
      console.log(this.state);
    }
    
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
          >
          <Form>
            <Item>
              <Input placeholder='Item' name='Item' 
                onChangeText={val => this.setState({name: val.trim()})}/>
            </Item>
            <Item>
              <Button rounded light
                onPress={() => updateQuantity('minus')}>
                <Text>-</Text>
              </Button>
              <Text>{this.state.quantity}</Text>
              <Button rounded light                
                  onPress={() => updateQuantity('add')}>
                <Text>+</Text>
              </Button>
            </Item>
          <Picker
            selectedValue={this.state.category}
            onValueChange={ val => this.setState({category: val})}>
            <Picker.Item label="Dairy" value="Dairy" />
            <Picker.Item label="Dry Goods" value="Dry Goods" />
            <Picker.Item label="Vegetables" value="Vegetables" />
            <Picker.Item label="Meat" value="Meat" />
          </Picker>
            <Button full success onPress={ () => {
              this.props.addItem(this.state);
              this.setModalVisible(!this.state.modalVisible)              
            }}><Text style={{color: 'white'}}>SAVE ITEM</Text></Button>
          </Form>
      </Modal>
          <Button full success onPress={() => {
            this.setModalVisible(true)
          }}>
            <Text style={{color: 'white'}}>ADD ITEM</Text>
          </Button>
      </View>
    );
  }
}

export default AddModal;
