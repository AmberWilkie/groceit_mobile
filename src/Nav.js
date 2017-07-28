import {
  TabNavigator,
} from 'react-navigation';
import HomeScreen from './App.js';
import FakeScreen from './screens/Fake';

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
  Fake: { screen: FakeScreen },
}, TabNavigatorConfig);

export default Nav;
