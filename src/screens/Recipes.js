import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, View } from 'native-base';
import Accordion from 'react-native-accordion';

import renderIf from '../utils/renderif';

const recipesList = [
  {
    id: 0,
    name: 'Fajitas',
    show: false,
    groceryItems: [
      {
        id: 0,
        name: 'Dairy',
        data: [
          { id: 0, name: 'Creme Fraische', quantity: 1},
          { id: 1, name: 'Butter', quantity: 1 }
        ],
      },
      {
        id: 1,
        name: 'Dry Goods',
        data: [
          { id: 0, name: 'Medium Tortillas', quantity: 4},
          { id: 1, name: 'Bread', quantity: 2},
        ],
      },
      {
        id: 2,
        name: 'Vegetables',
        data: [
          { id: 0, name: 'Yellow pepper', quantity: 1},
          { id: 2, name: 'Green pepper', quantity: 1},
          { id: 1, name: 'Avocado', quantity: 2},
          { id: 4, name: 'Onion', quantity: 1},
          { id: 5, name: 'Garlic', quantity: 1 },
          { id: 6, name: 'Jalapeno', quantity: 1}
        ],
      },
      {
        id: 3,
        name: 'Frozen',
        data: [
          { id: 0, name: 'Cilantro', quantity: 1},
        ],
      },
    ]
  },
  {
    id: 1,
    name: 'Warm Potato Salad',
    show: false,
    groceryItems: [
      {
        id: 1,
        name: 'Dry Goods',
        data: [
          { id: 0, name: 'Olive Oil', quantity: 1},
          { id: 1, name: 'Capers', quantity: 1},
        ],
      },
      {
        id: 2,
        name: 'Vegetables',
        data: [
          { id: 0, name: 'Potatoes', quantity: 6},
          { id: 2, name: 'Green beans', quantity: 1},
          { id: 1, name: 'Arugula', quantity: 1},
          { id: 4, name: 'Red onion', quantity: 1},
          { id: 5, name: 'Shallot', quantity: 1 },
          { id: 6, name: 'Lemon', quantity: 1}
        ],
      },
    ]
  },
];


class RecipesScreen extends Component {
  static navigationOptions = {
    title: 'Recipes'
  }
  state = {
    recipes: []
  }

  componentDidMount() {
    this.setState({
      recipes: recipesList
    })
  }

  render() {
    const { navigate } = this.props.navigation;

    const renderItem = ({item}) => {
      return (
      <ListItem>
          <Accordion header={ <Text style={{alignSelf: 'stretch'}}>{item.name}</Text>} 
            content={ 
              <List dataArray={item.groceryItems}
                renderRow={renderGroceryItems} />
            }
        />
      </ListItem>
    )}

    const renderGroceryItems = item => (
        <List dataArray={item.data}
          renderRow={item => (
            <ListItem >
              <Text style={{flex: 1, width: '100%'}}>{item.name}</Text>
              <Text>{item.quantity}</Text>
            </ListItem>
          )} />
    )

    const renderHeader = item => (
      <View>
      <List>
      <ListItem 
        style={{width: '100%', flex: 0}}
        onPress={() => {
        this.setState( prevState => {
          const newState = prevState.recipes.map( recipe => {
            if (recipe === item) {
              recipe.show = !recipe.show
            }
            return recipe
          })  
          return ({recipes: newState})
        })
      }}>
        <Text>{item.name}</Text>
      </ListItem></List>
      </View>
    )
  

    return (
      <Container>
        <Content>
          <FlatList
            data={this.state.recipes}
            renderItem={renderItem}
            keyExtractor={({id}) => id}
            />
        </Content>
      </Container>
    )
  }
}

export default RecipesScreen;
