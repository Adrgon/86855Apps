
import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { useDB } from '../hooks/useDb';
import { setUser } from '../features/User/userSlice';

const Navigator = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth.value)
  const { getSession } = useDB()
  console.log(user)

  useEffect(()=>{
    (async ()=>{
      try {
        const response = await getSession()
        if(response){
          const user = response;
          dispatch(
            setUser({
              email: user.email,
              localId: user.localId,
              idToken: user.token
            }))         
        }
      } catch (err){
        console.log(err)
      }
    })()
  }, [user])
  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default Navigator
