/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  SectionList,
  AsyncStorage
} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';

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
  },
    {
    id: 3,
    name: 'Meat',
    data: [
      { id: 0, name: 'Chicken breasts', quantity: 2},
      { id: 1, name: 'Värmkorv', quantity: 1}
    ],
  },
];

export default class groceit_mobile extends Component {
  state = {
    groceryList: []
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

  handleClick = (item, section) => {
    this.setState( prevState => ({
      groceryList: prevState.groceryList.map( listSection => {
        if (section === listSection) {
          console.log(listSection.data.filter( listItem => item !== listItem))
          return {
            ...listSection, 
            data: listSection.data.map( listItem => {
              if (item === listItem) {
                console.log(listItem);
                listItem.disabled = 'true'
              }
              return listItem;
            })
          }
        } else {
          return listSection
        }
      })
    })
    )
  }

  renderItem = ({item, section}) => {
    if (item.disabled === 'true') {
      style = styles.groceryItemDisabled
    } else {
      style = styles.groceryItem
    }
    return (
      <ListItem onPress={() => this.handleClick(item, section)}>
        <Text style={style}>{item.name}</Text> 
        <Text style={[style, {flex: 0}]}>{item.quantity}</Text>
      </ListItem>
    )
  }

  //Examples of async storage uses - works just like localStorage but it's async
  setAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('@GroceIt:key', 'I like to save it.');
    } catch (error) {
      console.log('async storage error: ', error);
      // Error saving data
    }
  }

  getAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('@GroceIt:key');
      if (value !== null){
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  componentDidMount() {
    this.getGroceryList();
  }

  render() {
    const renderSectionHeader = ({section}) => {
      return (
        <Separator bordered>
          <Text style={{fontSize: 15}}>{section.name.toUpperCase()}</Text>
        </Separator>
      )
    }
    
    return (
      <Container>
        <Header />
        <Content>
        <Text>{this.state.error}</Text>
        <SectionList
          sections={this.state.groceryList}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={ ({id}) => id } />
        </Content>
      </Container>
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
  groceryItem: {
    flex: 1
  },
  groceryItemDisabled: {
    flex: 1,
    color: 'lightgray'
  }
});

