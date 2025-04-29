
import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useSelector } from 'react-redux';

const Navigator = () => {
  // lo vamos a sacar
  //const [user, setUser] = useState("");
  const {user} = useSelector(state => state.auth.value)
  //console.log(user)
  return (
    <NavigationContainer>
      {!user ? <AuthStackNavigator /> : <BottomTabNavigator />}
    </NavigationContainer>
  );
}

export default Navigator
