import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,Image, TextInput,Button,ScrollView, FlatList, Pressable } from 'react-native';
import {GetWeatherData} from './api/Api';
import { weatherImages } from './constants/Variable';
import * as Progress from 'react-native-progress';
import { TempDetails } from './components/TempDetails';
import { ForecastDetail } from './components/ForecastDetail';


export default function App() {
const[loading,setLoading]=useState(true);
const [weatherdata,setWeatherdata]=useState({});
const [city,setCity]=useState("");

async function addEventListener(){
  if(city===""){
    alert("Enter city name");
    return;
  }
  setLoading(false);
  GetWeatherData(city).then(data=>{
    setWeatherdata(data);
    setLoading(true);
  })
}

function addCityHandler(city){
  setCity(city);
}

const {location,current,forecast}=weatherdata;

  return (
    <View style={styles.inputcontainer}>
      <StatusBar style="light" className="absolute" />
      <Image blurRadius={70} source={require('./assets/images/bg.png')} className="h-full w-full absolute" />
        <View style={styles.inputcontainer} className="flex-row mt-4 justify-center items-center rounded-full">
        <View style={{width:'80%'}}className="bg-white opacity-50 rounded-full mx-2 justify-center p-1.5 pl-2">
        <TextInput onChangeText={addCityHandler} placeholder='Search city'placeholderTextColor="#000000"/>
        </View>
        <Pressable android_ripple={{color:'white'}} onPress={addEventListener}>
        <View className='rounded-full w-10 h-10 bg-white justify-center items-center opacity-80'>
        <Text className="text-2xl">&#128270;</Text>
        </View>
        </Pressable>
        </View>
        
      {loading?<View style={styles.textcontainer}>
                <Text className="text-white text-center text-3xl font-bold">
                  {location?.name}
                  <Text className="text-lg font-semibold text-gray-300">, {location?.region}</Text>
                </Text>
                <View className="flex-row justify-center mt-2">
                  <Image 
                    source={weatherImages[current?.condition?.text || 'other']} 
                    className="w-52 h-52 m-5" />
                </View>
                 <View className="mt-3">
                    <Text className="text-center font-bold text-white text-6xl ml-5">
                      {current?.temp_c}&#176;
                    </Text>
                    <Text className="text-center text-white text-xl tracking-widest px-3">
                    {current?.condition?.text}
                    </Text>
                  </View>

                <TempDetails current={current} forecast={forecast} />


                <View className="justify-center items-start pl-5 mt-5">
                  <Text className="text-white text-base">Daily forecast</Text>
                </View>
                <View className="flex mb-1 space-y-3">
                  <ScrollView horizontal={true}>
                    {
                      forecast?.forecastday?.map((item,index)=>{
                        const date = new Date(item.date);
                        const options = { weekday: 'long' };
                        let dayName = date.toLocaleDateString('en-US', options);
                        dayName = dayName.split(',')[0];
                        return(
                          <ForecastDetail key={index} item={item} dayName={dayName} />
                        );
                    })}
                      </ScrollView>
                </View>
              </View>:<View style={styles.textcontainer} className="flex-7 justify-center items-center mt-10">
               <Progress.CircleSnail thickness={10} size={100} color="#0bb3b2" />
                </View>
              }
      </View>
  );
  }
  
  const styles = StyleSheet.create({
    inputcontainer: {
      flex: 1,
    },
    textcontainer:{
      flex:4,
      paddingBottom:16,
      paddingHorizontal:6,
    }
  });

