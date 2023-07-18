import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {AppLoading} from 'expo-app-loading';
import {AntDesign} from '@expo/vector-icons';
import { useFonts, Lato_400Regular, } from '@expo-google-fonts/lato';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity,ScrollView, Modal, TouchableHighlight,TextInput } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  console.disableYellowBox = true;

  const image = require('./src/bg.jpg');
  const [tarefas, setTarefas] = useState([])
  const [modal, setModal] = useState(false)
  const [tarefaAtual, setTarefaAtual] = useState('')

  useEffect(()=>{
    //quando iniciar, ler anotação key

    (async function(){
      try {
         const alltasks  = await AsyncStorage.getItem('tarefas');
          if(alltasks == null){
            setTarefas([])
          }else{
            setTarefas(JSON.parse(alltasks));
          }
      } catch (error) {
        alert(error)
      }
    })()
  },[])

 
  

  async function deleteTarefa(id){
    let newTarefa = tarefas.filter((val)=>{
      return val.id != id
    })
    await deleteStorage(newTarefa);
    async function deleteStorage(newTarefa){
      {
        try{
          await AsyncStorage.setItem('tarefas', JSON.stringify(newTarefa))
        }catch(error) {
          alert(error)
        }
      }
    }
    
    setTarefas(newTarefa)

  }

  async function addTarefa() {
    setModal(!modal);

    let id = 0;
    if(tarefas.length > 0){
      id = tarefas[tarefas.length - 1].id + 1
      //id = tarefas.length + 1;
    }
    let tarefa = {
      id: id,
      tarefa: tarefaAtual
    }
    
    await updateStorage()
    async function updateStorage(){
      try{
        await AsyncStorage.setItem('tarefas', JSON.stringify([...tarefas,tarefa]));
      }catch(error) {
        alert(error)
      }
    }
    
    setTarefas([...tarefas,tarefa])

  }
  return (
    <ScrollView style={{...styles.container}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        statusBarTranslucent
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput autoFocus={true} onChangeText={text => setTarefaAtual(text)}></TextInput>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => addTarefa()}
            >
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>


      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.textTitle}>Lista de tarefas</Text>
        </View>
      </ImageBackground>

      {
      tarefas.map((val)=>{
        return (<View style={styles.anotacaoSingle}>
          <View style={{flex:1,width:'100%'}}>
            <Text>{val.tarefa}</Text>
          </View>
          <View style={{flex:1,alignItems:'flex-end'}}>
              <TouchableOpacity>
                <AntDesign name="minuscircleo" size={24} color="black"  onPress={() =>deleteTarefa(val.id)}/>
              </TouchableOpacity>
          </View>
        </View>)
      })
      }

      <TouchableOpacity style={styles.btnAddTarefa} onPress={()=>setModal(true)}>
        <Text
         style={{textAlign:'center',color:'white'}}>Adicionar Tarefa!
        </Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop:Constants.statusBarHeight
  },  
  image: {
    width:'100%',
    height:100,
  },
  overlay:{
    width:'100%',
    height:100,
    backgroundColor:'rgba(0,0,0,.5)',
    justifyContent: "center",
  },  
  textTitle:{
    fontSize:23,
    fontWeight:'bold',
    padding:9,
    color:'white',
  },
  anotacaoSingle:{
    marginTop:30,
    width:'100%',
    borderBottomWidth:1,
    borderBottomColor:'black',
    flexDirection:'row',
    padding:10
  },
  //Estilos para nossa modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex:5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  btnAddTarefa:{
    width:'100%',
    padding:10,
    backgroundColor:'#2196F3',
    marginTop:20
  }
});



// let [fontsLoaded] = useFonts({
//     Lato_400Regular,
//   });

  
//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }else{
//   }

//     fontFamily:'Lato_400Regular',
