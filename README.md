# React Native project - Check your list

<!-- ![logo](assets/icon-checkyourlist.png) -->
<img src="/assets/icon-weather.png" width="30%" height="30%"/>

## Used skills

- React Native
- Expo Go


## How to run?
- Download Expo or Expo Go app, and run the command below:


        $ expo start
           



## What I learn from this project is:
- How to bring [weather API](https://openweathermap.org/api) and read the location data that longitude and latitude.
- How to diplay the data on the screen such as weather, date, weather descriptions.
- Making a diffrent layout with View and Scrollview tag


## Challenge part

- Reading geolocation information, because React Native no longer supports geolocation(Deprecated)
- A hook should be used that supported by Expo Go:
```javascript
        // useBackgroundPermission()
        
        // example
        const [status, requestPermission] = Location.useBackgroundPermissions();
```


- I wanted to put the date, but the format was, for example,

        "dt": 1650949200

I need to convert this to date format. Refer to this [link](https://www.w3schools.com/js/js_dates.asp) and this [article](https://javascript.tutorialink.com/how-to-get-data-info-from-openweathermap-api-dt/) I learned that numbers are milliseconds of the date of the day. For displaying the date coded like this:

        new Date(day.dt*1000).toDateString() // display: Mon Apr 25 2022

if substring() added

        new Date(day.dt*1000).toDateString().substring(0, 10) // display: Mon Apr 25

        new Date(day.dt*1000).toISOString().substring(0, 10) // display: 2022-04-25

        new Date(day.dt*1000).toUTCString().substring(0, 16) // display: Mon, 25 Apr 2022



## Demo

- Link :  https://expo.dev/@haillie/WeatherApp

- AR code:

    <img src="/assets/qrcode.png" width="30%" height="30%"/>


- Demo

    <!-- <img src="/img/demo.gif" width="20%" height="20%"/> -->


    ### Screens
    
    <img src="/assets/weather-app01.gif" width="30%" height="30%"/> <img src="/assets/weather-app02.gif" width="30%" height="30%"/>
