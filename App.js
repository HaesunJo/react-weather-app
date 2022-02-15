import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { StatusBar } from 'expo-status-bar';
import { Fontisto } from "@expo/vector-icons";
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';

const { width:SCREEN_WIDTH } = Dimensions.get("window");
// const SCREEN_WIDTH = Dimensions.get("window").width; // 위 코드와 같은 코드
// console.log(SCREEN_WIDTH); // print wdith of the device

const API_KEY = "c6da87942b0e49491f5611e96492f5f9"; // 따로 서버가 없기에 일단 여기에 씀

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning"
}

export default function App() {

  const [city, setCity] = useState("Loading...");
  // const [location, setLocation] = useState(null); //필요없음
  const [days, setDays] = useState([]); // create an array for storing the forcasts
  const [check, setCheck] = useState(true);

  //ask a permission
  // -> we are not asking the user's location, what we need is weather frocasts
  //    so, change the name ask to getWeather
  const getWeather = async() => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // console.log(permission);

    // 1. if the user rejected a location permission, when the location was not granted,
    // change the setCheck will pass false value
    if(!granted){
      setCheck(false);
    }

    // 2. Get the user's location with getCurrentPostion()
    // accuracy level from 1 to 6, higher number is more accurate
    //  const location = await Location.getCurrentPositionAsync({accuracy:5});
    // Get the value of latitude and longitude with the code above
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy:5 });

    // 3. Get an accurate location of user, use reverseGeocodeAsync
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    // consol.log(location);
    // consol.log(location[0].city);
    setCity(location[0].city);

    // fetch the API
    // Replace the values from step 3
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    // console.log(json);
    setDays(json.daily);
    // console.log(json.daily);
  }; 

  useEffect(() => {
    getWeather();
  }, []);

  return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.city}>
          <Text style={styles.cityName}>{ city }</Text>
        </View>
        <ScrollView
          pagingEnabled
          horizontal
          indicatorStyle="white"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weather}>
          { days.length === 0 ? (
            <View style={{ ...styles.day, alignItems: "center" }}>
              <ActivityIndicator color="white" size="large" style={{ marginTop: 10 }} />
            </View>
            ) : (
              days.map((day, index) => 
                <View key={index} style={styles.day}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <Text style={styles.temp}>{ parseFloat(day.temp.day).toFixed(1) }</Text>
                    <Fontisto 
                      name={icons[day.weather[0].main]} 
                      size={ 70 } 
                      color="#EEA47F" />
                  </View>
                  <Text style={styles.date}> { new Date(day.dt*1000).toString().substring(0, 10) } </Text>
                  <Text style={styles.description}>{day.weather[0].main}</Text>
                  <Text style={styles.detailDes}>{day.weather[0].description}</Text>
                </View>
              )
            )}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: "#00539C"
  },
  city: {
    flex: 1.1,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 48,
    color: "#EEA47F",
    fontWeight: "400",
  },
  date: {
    fontSize: 30,
    color: "#EEA47F",
    fontWeight: "400",
    marginStart: -5,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    alignItems: "flex-start",
    paddingHorizontal: 30,
  },
  temp: {
    marginTop: 50,
    fontSize: 130,
    fontWeight: "400",
    color: "#EEA47F",
  },
  description: {
    marginTop: -10,
    fontSize: 60,
    fontWeight: "300",
    color: "#EEA47F",
  },
  detailDes: {
    marginTop: -10,
    fontSize: 30,
    color: "#EEA47F",
    fontWeight: "500",
  }
})