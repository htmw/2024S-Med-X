import React, { useEffect, useState } from 'react';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const Images = () => {
  const [xrayImages, setXrayImages] = useState([])

  useEffect(() => {
    const imageListRef = ref(storage, "images/")
    listAll(imageListRef).then((response) => {
      const promises = response.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setXrayImages(urls);
      }).catch((error) => {
        console.error("Error fetching image URLs:", error);
      });
    }).catch((error) => {
      console.error("Error listing images:", error);
    });
  }, []);
  //Allimages
  return (
    //flex-col inline-flex gap-6
    <div className='grid grid-cols-10 gap-6'>
      {xrayImages.map((url, index) => {

        return <img key={index} src={url} alt={"Image" `${index}`} />
        //return <p className="text-white">{url}</p>
      })}
    </div>
  );
}

export default Images;
