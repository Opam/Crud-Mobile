import React, {useState} from 'react';
import {Component} from 'react';
const {width} = Dimensions.get('window');
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Fragment,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

import SelectDropdown from 'react-native-select-dropdown';



class Recap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      setSelected: '',
      namaKode: '',
      namaValue: '',
      alamatKode: '',
      namaData: [],
      posisiData:[],
      posisi2Code:'',
      editMode: false,
      index: -1,
      countries: ['Egypt', 'Canada', 'Australia', 'Ireland'],
    };
  }

  randomKode = () => {
    var text = '';
    var kode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++)
      text += kode.charAt(Math.floor(Math.random() * kode.length));

    return text;
  };

  componentDidMount() {
    this.getData();
    this.getlaporan();
  }

  addData = () => {
    let allData = this.state.namaData;
    if (this.state.editMode) {
      allData[this.state.index].nmmatkul = this.state.namaKode;
      allData[this.state.index].pss = this.state.posisi2Code;
      this.setState({editMode: false});
    } else {
      allData.push({
        kdmatkul: this.randomKode(),
        nmmatkul: this.state.namaKode,
        pss:this.state.posisi2Code,

      });
    }

    this.setState({namaData: allData, namaKode: '',posisi2Code: ''}, () => this.saveData());
  };

  saveData = async () => {
    try {
      await AsyncStorage.setItem(
        '@tabel_matkul',
        JSON.stringify(this.state.namaData),
      );
      console.log('Data berhasil tersimpan');
    } catch (e) {
      console.log(e);
    }
  };

  getData = async () => {
    try {
      let value = await AsyncStorage.getItem('@tabel_matkul');
      value = JSON.parse(value);
      if (value !== null) {
        this.setState({namaData: value});
      }
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  };

  getlaporan = async () => {
    try {
      let value = await AsyncStorage.getItem('@laporan');
      value = JSON.parse(value);
      if (value !== null) {
        this.setState({posisiData: value});
      }
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  };

  deleteData = index => {
    let allData = this.state.namaData;
    allData.splice(index, 1);
    this.setState({namaData: allData}, () => this.saveData());
  };

  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: '#1a75ff',
            alignContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Text
            style={{
              color: '#fafafafa',
              fontWeight: 'bold',
            }}>
            Recap Data 
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: '#1a75ff',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Nama Karyawan
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 20,
          }}>
          <TextInput
            value={this.state.namaKode}
            onChangeText={text => this.setState({namaKode: text})}
            style={{
              backgroundColor: '#cce0ff',
            }}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: '#1a75ff',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Bulan
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 20,
          }}>
          <SelectDropdown
            data={this.state.posisiData}
            onSelect={selectedItem => {
              console.log(selectedItem.posisi);
              this.setState({posisi2Code: selectedItem.posisi});
              return selectedItem.posisi;
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem.posisi;
            }}
            rowTextForSelection={item => {
              return item.posisi;
            }}
            // defaultValue={'Budi Hartanto'}
            onSelectText={text => this.setState({posisi2Code: text})}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown1searchInputStyleStyle}
            searchPlaceHolder={'Search here'}
            searchPlaceHolderColor={'darkgrey'}
          />

          {/* <SelectDropdown
            data={this.state.namaDosen}
            // defaultValue={'Budi Hartanto'}

            // data={this.state.countries}
            onSelect={selectedItem => {
              console.log(selectedItem);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem;
            }}
            rowTextForSelection={item => {
              return item.namadosen;
            }}
            // //  value={'Negera'}
            // //   onChangeText={'Negara'}
            // //   value={this.state.alamatKode}
            // //   defaultValue={this.state.alamatKode}
            // //  onChangeText={text => this.setState({alamatKode: text})}
            // // buttonStyle={styles.dropdown1BtnStyle}
            // // buttonTextStyle={styles.dropdown1BtnTxtStyle}
            // // dropdownIconPosition={'right'}
            // // dropdownStyle={styles.dropdown1DropdownStyle}
            // // rowStyle={styles.dropdown1RowStyle}
            // // rowTextStyle={styles.dropdown1RowTxtStyle}
            // // selectedRowStyle={styles.dropdown1SelectedRowStyle}
            // // search
            // // searchInputStyle={styles.dropdown1searchInputStyleStyle}
            // // searchPlaceHolder={'Search here'}
            // // searchPlaceHolderColor={'darkgrey'}
          /> */}
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => this.addData()}
            style={{
              backgroundColor: '#1a75ff',
              paddingVertical: 10,
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: 6,
            }}>
            <Text
              style={{
                color: '#fafafafa',
              }}>
              Simpan Data
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
          }}>
          <FlatList
            data={this.state.namaData}
            renderItem={({item, index}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingVertical: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 350,
                  }}>
                  <Text
                    style={{
                      color: '#1a75ff',
                      fontSize: 16,
                    }}>
                    {item.nmmatkul} {item.pss}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.deleteData(index)}
                  style={{
                    width: 40,
                  }}>
                  <Icon name="trash" size={25} color="#1a75ff" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      namaKode: item.nmmatkul,
                      pss: item.posisi2Code,
                      index,
                      editMode: true,
                    })
                  }>
                  <Icon name="pen-square" size={27} color="#1a75ff" solid />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.kdmatkul}
          />
        </View>
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2SelectedRowStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},
  dropdown2searchInputStyleStyle: {
    backgroundColor: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3searchInputStyleStyle: {
    backgroundColor: 'slategray',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
});

export default Recap;
