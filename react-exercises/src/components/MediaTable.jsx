import React, {useEffect, useState} from 'react';
import MediaRow from './MediaRow';
import {baseUrl} from '../utils/variables';

const MediaTable = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    const response = await fetch(baseUrl + 'media');
    const files = await response.json();
    const filesWithThumbnails = await Promise.all(
      files.map(async (file) => {
        const response = await fetch(baseUrl + 'media/' + file.file_id);
        return await response.json();
      })
    );
    setMediaArray(filesWithThumbnails);
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
