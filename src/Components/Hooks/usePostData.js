import { useEffect, useState } from "react";

const usePostData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, data) => {
    setIsLoading(true);
    console.log("posting image data", data);
    const { title, content, images } = data;

    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("file", images[i].file);
      }
      formData.append("title", title);
      formData.append("content", content);

      const response = await fetch(url, {
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

  return { postData, isLoading, error };
};

export default usePostData;
