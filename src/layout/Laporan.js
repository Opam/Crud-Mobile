import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Fragment,
    StatusBar,
  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Laporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posisiCode: '',
      posisi2Code: '',
      posisiData: [],
      editMode: false,
      index: -1,
    };
  }

  componentDidMount() {
    this.getData();
  }

  randomKode = () => {
    var text = '';
    var kode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++)
      text += kode.charAt(Math.floor(Math.random() * kode.length));

    return text;
  }

  addData = () => {
    let allData = this.state.posisiData;
    if (this.state.editMode) {
      allData[this.state.index].posisi = this.state.posisiCode;
      allData[this.state.index].posisi2 = this.state.posisi2Code;
      this.setState({ editMode: false });
    } else {
      allData.push({
        kode: this.randomKode(),
        posisi: this.state.posisiCode,
        posisi2: this.state.posisi2Code,
      });
    }

    this.setState({ posisiData: allData, posisiCode: '', posisi2Code: '' }, () => this.saveData());
  };

  saveData = async () => {
    try {
      await AsyncStorage.setItem('@laporan', JSON.stringify(this.state.posisiData));
      console.log('Data Berhasil Tersimpan');
    } catch (e) {
      console.log(e);
    }
  };

  getData = async () => {
    try {
      let value = await AsyncStorage.getItem('@laporan');
      value = JSON.parse(value);
      if (value !== null) {
        this.setState({ posisiData: value });
      }
      console.log('Data Berhasil Ditampilkan');
    } catch (e) {
      console.log(e);
    }
  }

  deleteData = (index) => {
    let allData = this.state.posisiData;
    allData.splice(index, 1);
    this.setState({ posisiData: allData }, () => this.saveData());
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fafafafa" />
        <View style={{
          backgroundColor: "#1a1a1a",
          paddingVertical: 10,
        }}>
          <View> 
            <Text style={{ color: 'white', alignItems: 'center', textAlign: 'center', fontSize: 25, }}>Laporan Keuangan</Text>
          </View>

        </View>

        <View>
          <Text style={{ color: 'black', left: 20, top: 10, fontWeight: 'bold' }}>Bulan</Text>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
            }}>
            <TextInput
              value={this.state.posisiCode}
              onChangeText={text => this.setState({ posisiCode: text })}
              style={{
                backgroundColor: 'grey',
              }}
            />
          </View>
          <Text style={{ color: 'black', left: 20, top: 10, fontWeight: 'bold' }}>Pendapatan Bersih</Text>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
            }}>
            <TextInput
              value={this.state.posisi2Code}
              onChangeText={text => this.setState({ posisi2Code: text })}
              style={{
                backgroundColor: 'grey',
              }}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => this.addData()}
              style={{
                backgroundColor: 'cyan',
                paddingVertical: 10,
                alignContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white'
                }}>
                Simpan Data
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
          }}>
          <FlatList
          data={this.state.posisiData}
          renderItem={
            ({item, index}) => (
              <View style={{flex:1, flexDirection:'row', paddingVertical:10,}}>
                <Text style={{
                  color:'black',
                  flex:20,
                }}>{item.posisi} {item.posisi2} 
                </Text>
                <TouchableOpacity 
          onPress={() =>
            this.deleteData(index)}
          style={{
            width : 40,
          }}>
            <Icon name="trash" size={25} color='navy' />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() =>
            this.setState({
              posisiCode: item.posisi,
              posisi2Code : item.posisi2,
              index,
              editMode: true,
            })
          }>
            <Icon name = "pen-square" size={25} color = 'navy' solid />
          </TouchableOpacity>
          </View>
            )
          }
            keyExtractor={(item) => item.posisi}
          />
        </View>

        <View style={{ flex: 1, backgroundColor: "#fafafafa" }}></View>
        <View>
          <View style={{
            backgroundColor: "#fafafa",
            paddingVertical: 15,
            flexDirection: "row",
          }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}>

              <Icon name="home" size={30} color="#1a1a1a" />
              

            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Laporan;