import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataLoading from './DataLoading';

const get = url => axios.get(url);
const APILoader = ({ children, url }) => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    (async () => {
      const response = await (get(url));

      setResponse(response);
    })();
  }, [url]);


  const Component = children
  return Component && response.data
    ? (
      React.cloneElement(Component, response)
    )
    : (
      <DataLoading />
    );
};

export default APILoader;