import React, { useState, useEffect } from 'react';
import './style.css';

function useFetch(url, defaultResponse) {
  const [data, setData] = useState(defaultResponse);

  async function getDataFromApi(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setData({
        isLoading: false,
        data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getDataFromApi(url);
  }, [url]);

  return data;
}

function App() {
  const apiEndpoint = 'https://jsonplaceholder.typicode.com/users/1/todos';
  const todosFetchResponse = useFetch(apiEndpoint, {
    isLoading: true,
    data: null,
  });

  if (todosFetchResponse.isLoading) {
    return 'Loading...';
  }
  return (
    <div>
      <ul>
        {todosFetchResponse.data.map((el) => (
          <li key={el.id}>
            <span>Task_id:{el.id}</span>
            <span>Title:{el.title}</span>
            <span>{el.completed && '✔️'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
