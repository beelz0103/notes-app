import { useEffect, useState } from "react";

const usePostData = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postText = async (url, postData) => {
    console.log("posting text data");
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { postText, isLoading, error };
};

export default usePostData;
