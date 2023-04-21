import { useState } from "react";

const usePostData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, formData) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      return data;
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.log(error);
    }
  };

  return { postData, isLoading, error };
};

export default usePostData;
