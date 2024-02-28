
import './App.css';

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
};

const sendPosition = (position) => {
    const { latitude, longitude } = position.coords;
    fetch('http://localhost:5000/api/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude, longitude })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

export default getLocation;
