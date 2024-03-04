
import './App.css';




const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
};

const sendPosition = async (position) => {
    const { latitude, longitude } = position.coords;

    try{
        const ipResponse= await fetch ('https://api.ipify.org?format=json');
        const ipData= await ipResponse.json();
        const ipAddress=ipData.ip;
    
        const dataToSend ={
            latitude,
            longitude,
            ipAddress,
        };



    const response = await fetch('http://localhost:5000/api/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    });

const responseData = await response.text();
console.log(responseData);
    }catch(error){
        console.error('Error:', error);
    }


//     .then(response =>{
//         if (!response.ok){
//             throw new error("HTTP error! status: ${response.status}");

//         }
//         return response.text();
//     })
    
//     .then(data => console.log(data))
//     .catch(error => console.error('Fetch error', error));
// };




};




export default getLocation;
