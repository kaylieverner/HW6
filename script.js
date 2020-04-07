var date = moment().format("MMMM Do YYYY"); 
$(".date").text(date);
var searchBtn = $("#searchBtn");
    
    searchBtn.click(getWeather);

    function getWeather() {
    var city = $("#cityInput").val();
    console.log(city);
    
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3b7c785e4d7c66cff4aa075b470fd6f5";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
              var cityDetails = $(".cityDetails"); 
              var cityName = response.name;
              var iconCode = response.weather[0].icon
              var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
              var icon = $(".icon").attr("src", iconURL);
              console.log(iconURL);
              cityDetails.text(cityName);
              var temp = (response.main.temp - 273.15) * 1.80 + 32; 
              $(".temp").text("Temperature: " + Math.floor(temp) + "°F");
              var humidity = response.main.humidity; 
              $(".humidity").text("Humidity: " + humidity + "%");
              var windSpeed = response.wind.speed;
              $(".windSpeed").text("Wind Speed: " + windSpeed + "MPH");

          }) 
    };

  
    searchBtn.click(populateList);
   // Populate side list of cities and call the city clicked 
    function populateList() {
        var city = $("#cityInput").val();
        //add activate class to the list item when clicked 
        //if city exists do not add to list STILL HAVE TO ADD THIS FUNCTIONALITY 
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3b7c785e4d7c66cff4aa075b470fd6f5";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
        var cityList = $(".cityList"); 
        var listItem = $("<li></li>").addClass("list-group-item");
        var listBtn = $("<button>" + response.name + "</button>").addClass("btn btn-link text-dark logged");
        listBtn.attr("data-name", response.name);
        listItem.html(listBtn);
        cityList.prepend(listItem);
          })
    }; 


    $(".logged").click(recallCity);

    function recallCity() {
        var city = $(this).attr("data-name"); 
        console.log(city);
        //add activate class to the list item when clicked 
        //if city exists do not add to list 
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3b7c785e4d7c66cff4aa075b470fd6f5";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
        console.log(response);
          });
    }

     // function populateFiveDay() {
    //     var city = $("#cityInput").val();
    //     var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=3b7c785e4d7c66cff4aa075b470fd6f5"; 
    //     $.ajax({
    //         url: fiveDayQueryURL,
    //         method: "GET"
    //       }).then(function(response) {
    //           console.log(response);
              
    //       })
    // } 
