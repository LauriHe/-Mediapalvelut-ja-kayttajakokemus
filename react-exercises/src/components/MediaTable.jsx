import React, {useEffect, useState} from 'react';
import MediaRow from './MediaRow';

const MediaTable = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    const response = await fetch('test.json');
    setMediaArray(await response.json());
  };

  useEffect(() => {
    try {
      getMedia();
    } catch (error) {
      console.log('useEffect ~ error:', error);
    }
  }, []);

  return (
    <table>
      <tbody>
        {mediaArray.map((item, index) => {
          return <MediaRow key={index} file={item} />;
        })}
      </tbody>
    </table>
  );
};

export default MediaTable;
