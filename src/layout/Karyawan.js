import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Karyawan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namaKode: '',
      namaData: [],
      editMode: false,
    };
  }

  addData = () => {
    let allData = this.state.namaData;
    if (this.state.editMode) {
      allData[this.state.index].nama = this.state.namaKode;
      this.setState({ editMode: false });
    } else {
      allData.push({
        nama: this.state.namaKode,
      });
    }
    this.setState({ namaData: allData, namaKode: '' }, () => this.saveData());
  };

  saveData = async () => {
    try {
      await AsyncStorage.setItem('@data_keinginan', JSON.stringify(this.state.namaData));
      console.log('Data Berhasil Tersimpan');
    } catch (e) {
      console.log(e);
    }
  };

  deleteData = (index) => {
    let allData = this.state.namaData;
    allData.splice(index, 1);
    this.setState({ namaData: allData }, () => this.saveData());
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Pendataan Karyawan</Text>
        <Text style={styles.title2}>Masukan Nama dan Jabatan</Text>
        <View style={styles.kotakisian}>
          <TextInput
            value={this.state.namaKode}
            onChangeText={(text) => this.setState({ namaKode: text })}
            style={{ backgroundColor: '#cce0ff' }}
          />
        </View>
        <TouchableOpacity style={styles.buttonsave} onPress={this.addData}>
          <Text style={styles.katabutton}>SAVE</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 150 }}></View>
          <View style={{ marginTop: 20 }}>
            <FlatList
              data={this.state.namaData}
              renderItem={({ item, index }) => (
                <View style={styles.texthasil}>
                  <Text style={{ color: '#33a2ff', flex: 10 }}>{item.nama}</Text>

                  <TouchableOpacity onPress={() => this.deleteData(index)}>
                    <Icon name="trash" size={16} color="#ff5733" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        namaKode: item.nama,
                        index,
                        editMode: true,
                      })
                    }
                  >
                    <Icon name="pen-square" size={16} color="#ff5733" />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.nama}
            />
          </View>
        </View>

        <View style={styles.kolombutton}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View>
              <Icon name="home" size={30} color="#1a1a1a" />
            </View>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#1a1a1a',
    marginBottom: 10,
  },
  title2: {
    fontSize: 15,
    color: '#000000',
  },
  kotakisian: {
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  kolombutton: {
    backgroundColor: '#fafafa',
    paddingVertical: 15,
    flexDirection: 'row',
  },
  deleteButton: {
    flexDirection: 'row',
    position: 'absolute',
    right: 2,
  },
  editButton: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  buttonsave: {
    backgroundColor: 'cyan',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    alignItems: 'center',
  },
  katabutton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 4,
    width: '80%',
  },
  buttonText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  texthasil: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
});

export default Karyawan;
