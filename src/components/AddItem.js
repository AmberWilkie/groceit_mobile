import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View,  } from 'react-native';
import { Button, Container, Content, Form, Item, TextInput, Input, Picker } from 'native-base';

class AddModal extends Component {
  state = {
    modalVisible: false,
    name: '',
    quantity: '',
    category: ''
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };

  render() {
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
              <Input placeholder='Quantity'
                onChangeText={val => this.setState({quantity: val.trim()})}/>
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
            }}><Text>Save Item</Text></Button>
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
