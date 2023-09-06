import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
const stack = createNativeStackNavigator();

const Stack = createNativeStackNavigator();

import Home from './src/layout/Home';
import Karyawan from './src/layout/Karyawan';
import Laporan from './src/layout/Laporan';
import Recap from './src/layout/Recap';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { };

    }
    render() { 
        return ( 
            <NavigationContainer>
                <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="Karyawan" component={Karyawan}/>
                    <Stack.Screen name="Laporan" component={Laporan}/>
                    <Stack.Screen name="Recap" component={Recap}/>
                    
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
export default App;