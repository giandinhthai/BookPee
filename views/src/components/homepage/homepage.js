import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './homepage.css'; // Import the CSS file for styling

function Homepage() {
  const [greetingFromServer, setGreetingFromServer] = useState(null);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const navigate = useNavigate();

  const backgrounds = [
    'https://e-learning.hcmut.edu.vn/theme/boost/images/slbk.jpg?1701272658035',
    'https://e-learning.hcmut.edu.vn/theme/boost/images/slbktv.jpg?1701272656955'
  ];

  useEffect(() => {
    axios.get('/api/homepage')
      .then((response) => {
        console.log(response);
        setGreetingFromServer(response.data.greeting);
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBackgroundIndex(prevIndex => (prevIndex + 1) % backgrounds.length);
    }, 5000); // Set interval to 3 seconds (3000 milliseconds)

    return () => clearInterval(intervalId); 
  }, [currentBackgroundIndex]);

  const backgroundImageStyle = {
    backgroundImage: `url(${backgrounds[currentBackgroundIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Adjust the height as needed
  };

  return (
    <div className="homepage-container" style={backgroundImageStyle}>
      
    </div>
  );
}

export default Homepage;
