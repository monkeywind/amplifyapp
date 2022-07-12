import logo from './logo.svg';
import './App.css';
import React from 'react';
import { render } from '@testing-library/react';

function App() {

  const [mostViewed, setMostViewed] = React.useState('not list');

  React.useEffect(() => {
    //setMostViewed('a newer list');
 
    (async () => {
      const API_NYTIMES = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=rnGkmDn3lpGdErVGG7JXkkisAfpktHJH';
      try {
        let response = await fetch(API_NYTIMES);		
        if (response.ok) {
          const data = await response.json();
          setMostViewed(handleData(data));
        } else {
          console.log('fetch error');
          console.error(`${response.status} ${response.statusText}`);
        }
      } catch (e) {
        console.log(`error with fetch call: ${e}`);
      } finally {
        //console.log('finally gets call every time');
      }
    
      
    })();       

  },[])

  const handleData = (data) => {
    
    let el = "";

    const listItems = data.results.map((headline, index) => 
      <li key={index}>{headline.title}</li>
    );

    return listItems;
  }

  
  return (
    <div style={{margin: 30}}>
      <h2>Most Viewed on NYTIMES</h2>
      <ul>
        {mostViewed}
      </ul>
    </div>
  );

 }

export default App;
