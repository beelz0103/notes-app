import { useEffect, useState } from "react";

const usePostImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postImage = async (url, images, note) => {
    setIsLoading(true);
    console.log("posting image data");

    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("file", images[i]);
      }

      const response = await fetch(url + note._id, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { postImage, isLoading, error };
};

export default usePostImage;
