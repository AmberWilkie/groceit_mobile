import {
  TabNavigator,
} from 'react-navigation';
import HomeScreen from './App.js';
import RecipesScreen from './screens/Recipes';

const TabNavigatorConfig = {
  swipeEnabled: true,
  tabBarOptions: {
    style: {
      backgroundColor: '#39ac39',
    },
    indicatorStyle: {
      display: 'none'
    }
  }
}

const Nav = TabNavigator({
  Home: { screen: HomeScreen },
  Recipes: { screen: RecipesScreen },
}, TabNavigatorConfig);

export default Nav;
