
// function render(temp,city){
//     let element=document.createElement('p');
//     element.textContent=`weather of ${city} is ${temp} deg celcious`;
//     element.style.color='red';
//     element.style.fontSize='2rem';
//     console.log(element)
//     document.body.appendChild(element)

// }



// async function Fetchweather(){
//     // let lat=15.33;
//     // let lon=20.54;
//     let API_key='989d24836988c344b2133cee0f3e8e18'
//     let cityy="Ladwa"

//     // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
//     // let data= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
//     // let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)

//     try{
//     let data= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityy}&appid=${API_key}&units=metric`);   
//     let response_json=await data.json();
//     let temp=response_json.main.temp;
//     let city=response_json.name;
//     render(temp,city)
//     }catch(err){
//         console.log(err)
        
//     }

// }

// Fetchweather();


// async function lat_lon_temp(lat,lon){
//     // let lat=15.33;
//     // let lon=20.54;
//     let API_key='989d24836988c344b2133cee0f3e8e18'

//     // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`

//     let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
//     let response_json=await  response.json();
//     console.log(response_json)


// }

// // lat_lon_temp();
// //let it be let all it by using current latitude and longitude



// //get current location
// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("no geolocation support");
//     }
// }

// function showPosition(position){
//     let lat=position.coords.latitude;
//     let longi=position.coords.longitude;
//     console.log(lat)
//     console.log(longi)
//     // lat_lon_temp(lat,longi)
//     //now you can get current city temp and many mpre
// }
// // getLocation()





const userTab=document.querySelector('[data-userWeather]');

const searchTab=document.querySelector('[data-searchWeather]');

const gif=document.querySelector('[gif]');

const userContainer=document.querySelector('.weather');

const granadAccessContainer=document.querySelector('.grant-location-container');

const searchForm=document.querySelector('.loading-container');

const UserInfoContainer=document.querySelector('.user-info-container');

const inputSection=document.querySelector(".form-container")

const loc_access=document.querySelector('[data-grantAccess]')

let input_city=document.querySelector('[search_city_btn]')

let userInput=document.querySelector('[data-searchInput]')

let if_notcity=document.querySelector('[if_notcity]')

if_notcity.classList.add('inactive')

//initially this is inactive
inputSection.classList.add('inactive')
gif.classList.add('inactive')


//made check whether user givlocation access
let latitude='';
let longitude='';

async function Access_grant(){
    console.log("keke")
    let result=await navigator.permissions.query({name:"geolocation"});
    if(result.state=="granted"){
        console.log("access h")
        granadAccessContainer.classList.add('inactive');
         const position=await getLocation();
        latitude=position.coords.latitude;
        longitude=position.coords.longitude;
        console.log(latitude)
        console.log(longitude)
        getcurrent_Weather();
    }
    else{
        granadAccessContainer.classList.add('flexx');

        UserInfoContainer.classList.add('inactive')

        userTab.classList.add('inactive')
        searchTab.classList.add('inactive')
        console.log(userTab)
        console.log("ji")

        

        const position=await getLocation();
        const updatedPermissionStatus=await navigator.permissions.query({name:"geolocation"});
        if(updatedPermissionStatus.state==='granted'){
            
            userTab.classList.remove('inactive')
            searchTab.classList.remove('inactive')
            latitude=position.coords.latitude;
            longitude=position.coords.longitude;
            console.log(latitude)
            console.log(longitude)

            UserInfoContainer.classList.remove('inactive');
            granadAccessContainer.classList.add('inactive')
            granadAccessContainer.classList.remove('flexx');
            getcurrent_Weather();

        }
    
    }

}



async function getLocation() {
    return new Promise((resolve, reject) => {
        
            navigator.geolocation.getCurrentPosition(
            function(position) {
                resolve(position);
            },
            function(error) {
                reject(error);
            }
        );
    });

    

}

if(navigator.permissions){
    Access_grant();
}



//initially
let currTab=userTab;

const API_KEY='989d24836988c344b2133cee0f3e8e18';

currTab.classList.add("current-tab")



async function getcurrent_Weather(){

    UserInfoContainer.classList.add('inactive')




    gif.classList.remove('inactive')
    console.log("hi")
    console.log(latitude)
    console.log(longitude)
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    let response_json=await response.json();
    // console.log(response_json)

    view_current_data(response_json);

    // return response_json
    // console.log(response_json)
}


function get_city_weather(){

    document.querySelector('[search_city_btn]').addEventListener('click',async ()=>{

        if(userInput.value!=''){
                if_notcity.classList.add('inactive')

                inputSection.classList.add('inactive')
                console.log("hi")

            gif.classList.remove('inactive')

            let city=document.querySelector('[data-searchInput]').value;
            console.log(city);
            let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            let response_json=await response.json();
            UserInfoContainer.classList.remove('inactive')

            view_current_data(response_json)
        
        }
        else{
            console.log("city not entered")
            if_notcity.classList.remove('inactive')

        }

       
    })
    //  if_notcity.classList.add('inactive')


}

 function view_current_data(data){
    gif.classList.add('inactive')
    UserInfoContainer.classList.remove('inactive')

    console.log(data);

    document.querySelector('[data-cityName]').textContent=data.name;
    document.querySelector('[data-temp]').textContent=`${data.main.temp} deg. celcious`;
    document.querySelector('[data-windSpeed]').textContent=data.wind.speed
    document.querySelector('[data-humidity]').textContent=data.main.humidity;
    document.querySelector('[data-country]').textContent=data.sys.country;
    document.querySelector('[data-cloudiness]').textContent=data.clouds.all



 }


userTab.addEventListener('click',function(){

    UserInfoContainer.classList.remove('inactive')
    inputSection.classList.add('inactive')
    getcurrent_Weather();
})



searchTab.addEventListener('click',function(){

    inputSection.classList.remove('inactive')
    UserInfoContainer.classList.add('inactive')
    
    userInput.value='';
    get_city_weather();

})











 

















