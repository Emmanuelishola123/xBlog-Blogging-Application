import React from "react";

function PostContentFormatter({content}) {
  return (
    <div dangerouslySetInnerHTML={{__html: content}}>
   
    </div>
  );
}

export default PostContentFormatter;
