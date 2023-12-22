import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = (searchTerm) => {
    setIsLoading(true);
    yelp
      .get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "san jose",
        },
      })
      .then((res) => {
        setIsLoading(false);
        setResults(res?.data?.businesses);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage("Something went wrong!");
      });
  };

  useEffect(() => {
    searchApi("pizza");
  }, []);

  return [searchApi, results, errorMessage, isLoading];
};
