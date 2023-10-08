import { weatherImages } from '../constants/Variable';
import { Image, Text, View } from 'react-native';
export const ForecastDetail = ({index,item,dayName}) => {
    return (
        <View
            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 m-4"
            style={{ backgroundColor: '#4F4F4F' }}
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
}