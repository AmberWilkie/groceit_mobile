/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  SectionList
} from 'react-native';
import Counter from './components/Counter';

import bag from './images/grocery-bag.jpg';

const groceryList = [
  {
    id: 0,
    name: 'Dairy',
    data: [
      { id: 0, name: 'Blue Cheese', quantity: 1},
      { id: 1, name: 'Milk', quantity: 1},
    ],
  },
  {
    id: 1,
    name: 'Dry Goods',
    data: [
      { id: 0, name: 'Cereal', quantity: 1},
      { id: 1, name: 'Bread', quantity: 2},
      { id: 2, name: 'Olive oil', quantity: 1},
      { id: 3, name: 'Canned peas', quantity: 1},
    ],
  },
  {
    id: 2,
    name: 'Vegetables',
    data: [
      { id: 0, name: 'Carrots', quantity: 5},
      { id: 1, name: 'Avocado', quantity: 2}
    ],
  }
];

export default class groceit_mobile extends Component {
  state = {
    groceryList: []
  }

  searchNasa = async () => {
    const json = await fetch('https://images-api.nasa.gov/search?q=jupiter');
    json.json()
      .then( data => {
        console.log(data.collection.items[0]);
        this.setState({
          nasaItems: data.collection.items.map( 
            item => {
              console.log({...item, renderItem: this.renderItem})
              return {...item, renderItem: this.renderItem}
            }
          ).slice(0, 20),
        })
      }).done();
  }

  getGroceryList = () => {
    this.setState({
      groceryList: groceryList.map( 
        item => {
          return {...item, renderItem: this.renderItem}
        }
      ),
    })
  } 

  renderItem = ({item}) => (
    <View>
      <Text>{item.name}: {item.quantity}</Text>
    </View>
  )

  componentDidMount() {
    this.getGroceryList(); 
  }

  render() {
    const renderSectionHeader = ({section}) => {
      return (
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{section.name}</Text>
      )
    }
    
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.groceryList}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={ ({id}) => id } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    height: 220,
    width: 180,
  },
});

