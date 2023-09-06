import React, { Component } from 'react';
import { View,Text, StatusBar, Touchable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

class Home extends Component {
    constructor(props) {
        super (props);
        this.state = {};
    }
    render() {
        return (
            <View style={{flex: 1}}> 
            < StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <View 
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#fafafafa',
                    paddingVertical: 20,
                }}>
                <TouchableOpacity>
                <Icon 
                    name="bars"
                    size={30} 
                    color="#1a1a1a" 
                    style={{paddingLeft: 20}}
                    />
                </TouchableOpacity>
                    
                    <Text style={{
                        marginLeft:30,
                        fontSize: 22,
                        fontFamily : 'Outfit-Medium',
                    }}> 
                    Hello, Good Morning! 
                    </Text>
                </View>
                <View style={{flex:1, backgroundColor:'#1a1a1a'}}>
                    <View style={{
                        backgroundColor: '#ff6600',
                        marginTop:80,
                        width: 418,
                        height: 150,
                        marginHorizontal: 35,
                        borderRadius: 10,
                    }}>

                    </View>

                    <View style={{flex:1, backgroundColor:'#1a1a1a'}}>
                    <View style={{
                        backgroundColor: '#ff6600',
                        marginTop:80,
                        width: 418,
                        height: 150,
                        marginHorizontal: 35,
                        borderRadius: 10,
                    }}>

                    </View>
                </View>

                <View 
                style={{
                    backgroundColor:'#fafafafa',
                    paddingVertical: 15,
                    flexDirection: 'row',
                }}>
                <TouchableOpacity style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View>
                    <Icon name="home" size={30} color="#0d0d0d" />
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Karyawan')}
                    style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View>
                    <Icon name="database" size={30} color="#0d0d0d" />
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Laporan')}
                style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View>
                    <Icon name="stack-overflow" size={30} color="#0d0d0d" />
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Recap')}
                style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View>
                
                    <Icon name="server" size={30} color="#0d0d0d" />
                </View>
                </TouchableOpacity>

                
                </View>
            </View>
            </View>
        );
    }
}

export default Home;
