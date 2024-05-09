import React, { useEffect, useState } from "react";
import { searchForComments } from "../../services/searchApis";

const SearchedComments = ({query}) => {
//   const [comments, setComments] = useState(null);


//   useEffect(async () => {
//     const { data } = await searchForComments({ query, ...others })
//     setComments({ ...data });
//     console.log({ data });
//   }, [query]);

  return <div>SearchedComments</div>;
};

export default SearchedComments;
