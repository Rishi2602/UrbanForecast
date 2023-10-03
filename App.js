import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,Image, TextInput,Button,ScrollView, FlatList, Pressable } from 'react-native';
import {GetWeatherData} from './api/Api';
import { weatherImages } from './constants/Variable';
import * as Progress from 'react-native-progress';


export default function App() {
const[loading,setLoading]=useState(true);
const [weatherdata,setWeatherdata]=useState({});
const [city,setCity]=useState("");

async function addEventListener(){
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
        <Pressable android_ripple='white' onPress={addEventListener}>
        <View className='rounded-full w-10 h-10 bg-white justify-center items-center opacity-80'>
        <Text className="text-2xl">&#128273;</Text>
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

                <View className="flex-row justify-around mx-4 pt-6">
                  <View className="flex-row space-x-2 items-center">
                    <Image source={require('./assets/icons/wind.png')} className="w-6 h-6" />
                    <Text className="text-white font-semibold text-base">{current?.wind_kph}km</Text>
                  </View>
                  <View className="flex-row space-x-2 items-center">
                    <Image source={require('./assets/icons/drop.png')} className="w-6 h-6" />
                    <Text className="text-white font-semibold text-base">{current?.humidity}%</Text>
                  </View>
                  <View className="flex-row space-x-2 items-center">
                    <Image source={require('./assets/icons/sun.png')} className="w-6 h-6" />
                    <Text className="text-white font-semibold text-base">
                    {forecast?.forecastday[0]?.astro?.sunrise }
                    </Text>
                  </View>
                </View>


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
                          <View  
                          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 m-4" 
                          style={{backgroundColor: '#4F4F4F'}}
                          key={index}
                       >
                          <Image
                            source={weatherImages[item?.day?.condition?.text || 'other']}
                              className="w-11 h-11" />
                          <Text className="text-white">{dayName}</Text>
                          <Text className="text-white text-xl font-semibold">
                          {item?.day?.avgtemp_c}&#176;
                          </Text>
                        </View>
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

