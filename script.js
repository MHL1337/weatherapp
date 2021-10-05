//random stuff, var, let etc.

let input = document.getElementById('input-box');
let searchbox = document.getElementById('search-button');
let homebutton = document.getElementById('home-button');


let da1 = document.getElementById('currentlocation');
let currtemp = document.getElementById('current-temp');
let currweather = document.getElementById('current-weather');
let temphigh = document.getElementById('temp-high');
let templow = document.getElementById('temp-low');
let currdate = document.getElementById('current-date');
let feelslike = document.getElementById('feels-like');

currtemp.textContent = "Current tempature: ";
currweather.textContent = "Current weather: ";
temphigh.textContent = "Todays highest tempature: ";
templow.textContent = "Todays lowest tempature: ";
    
    // hämtar datum och tid
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    currdate.textContent = "Current Date & Time: " + date +' ' + time;


    function hideandshow() { //gömmer detaljer
        var x = document.getElementById("w-hide");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }

function api5call() // Hämtar dom kommande fem dagarna, när funktionen "callas"
{
    const api = "https://api.openweathermap.org/data/2.5/forecast?q=" + input.value + "&appid=42e4f636ae234d064807440d65f977ea";
    fetch(api)
    .then ((response) => {
        return response.json();
    })
    .then (data => {

            for (i = 0; i<5; i++)
            {
                document.getElementById("day" + (i+1) + "min").innerHTML = "min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°C";
            }

            for(i = 0; i<5; i++){
                document.getElementById("day" + (i+1) + "max").innerHTML = "max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°C";
            }

            for(i = 0; i<5; i++){
                document.getElementById("day" + (i+1) + "feels_like").innerHTML = "temp: " + Number(data.list[i].main.feels_like - 273.15).toFixed(2) + "°C";
            }

            for(i = 0; i<5; i++){
                document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
                data.list[i].weather[0].icon
                +".png";
            }

            for(i = 0; i<5; i++)
            {

            }

            console.log(data);
    })
}



function apicall() //function som kallas ifrån valfritt ställe i JS.
{
    const api = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=3c90c120cc3a19909b03d9e4dde97d4d";

    fetch(api) //hämtar api.
        .then((response) => {
            return response.json(); //sparar informationen till json dokument
        })
        .then(data => {  //sparar temp, temp_max, temp_min och information ifrån main.
            const {name} = data;
            const {feels_like} = data.main;
            const {temp} = data.main;
            const {temp_max} = data.main;
            const {temp_min} = data.main;
            const {id, main} = data.weather[0];
            console.log(data);
            console.log(id);

            //Skriver ut temp och konverterar ifrån kelvin till celsius.
            da1.textContent = name; //Ändrar text till staden man sökt efter
            currtemp.textContent = "Current tempature: " + Math.round(temp -273) + "°C"; 
            currweather.textContent = "Current weather: " + main;
            temphigh.textContent = "Todays highest tempature: " + Math.round(temp_max-273) + "°C";
            templow.textContent = "Todays lowest tempature: " + Math.round(temp_min-273) + "°C";
            feelslike.textContent = "Feels like: " + Math.round(feels_like-273) + "°C";


    switch (id) { //väljer bild baserat på vilket id, hur vädret är.

    case 200, 201, 202, 210, 211, 212, 221, 230, 231, 232:
        document.getElementById("pic-id").src="11d.png";
        break;
    case 300, 301, 302, 310, 311, 312, 313, 314, 321:
        document.getElementById("pic-id").src="09d.png";
    break;

    case 500, 501, 502, 503, 504:
        document.getElementById("pic-id").src="10d.png";
    break;

    case 511:
        document.getElementById("pic-id").src="13d.png";
    break;

    case 520, 521, 522, 531:
        document.getElementById("pic-id").src="09d.png";
    break;

    case 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622:
        document.getElementById("pic-id").src="13d.png";
    break;

    case 701, 611, 721, 731, 741, 751, 761, 762, 771, 781:
        document.getElementById("pic-id").src="50d.png";
    break;

    case 800: 
    document.getElementById("pic-id").src="01d.png";
    break;

    case 801:
        document.getElementById("pic-id").src="02d.png";
    break;
    case 802:
        document.getElementById("pic-id").src="03d.png";
    break;
    case 803:
        document.getElementById("pic-id").src="04d.png";
    break;
    case 804:
        document.getElementById("pic-id").src="04d.png";
    break;
        default:
            document.getElementById("pic-id").src="error.png";
            break;
}

        })
}

api5call(input.value = "gävle");
apicall(input.value = "gävle"); //Hämtar gävle så fort sidan laddas (default skärm)


homebutton.addEventListener('click', function() { //hem knapp till gävle
    apicall(input.value = "gävle");

})


searchbox.addEventListener('click', function() { //Lyssnar efter att man tryckt på knappt
    if (input.value =="") //ifall man inte skrivit något i sök fältet.
    {
        alert('Du måste skriva något!');
    }
    
    else { //ifall man har skrivit något så försöker koden söka efter api.
        
        apicall();
    }
})


