import { weatherImages } from '../constants/Variable';
import { Image, Text, View } from 'react-native';
export const TempDetails = ({current,forecast}) => {
    return (
        <View className="flex-row justify-around mx-4 pt-6">
                  <View className="flex-row space-x-2 items-center">
                    <Image source={require('../assets/icons/wind.png')} className="w-6 h-6" />
                    <Text className="text-white font-semibold text-base">{current?.wind_kph}km</Text>
                  </View>
                  <View className="flex-row space-x-2 items-center">
                    <Image source={require('../assets/icons/drop.png')} className="w-6 h-6" />
                    <Text className="text-white font-semibold text-base">{current?.humidity}%</Text>
                  </View>
                  <View className="flex-row space-x-2 items-center">
                    <Image source={require('../assets/icons/sun.png')} className="w-6 h-6" />
                    <Text className="text-white font-semibold text-base">
                    {forecast?.forecastday[0]?.astro?.sunrise }
                    </Text>
                  </View>
                </View>
    );
}