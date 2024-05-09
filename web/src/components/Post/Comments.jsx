import { Flex } from "@chakra-ui/react";

import SingleComment from "./SingleComment";

function Comments({comments}) {
  return (
    <Flex gap={3} mt={8} direction="column">
      {comments.map((comment) => (
        <SingleComment key={comment?._id} data={comment} />
      ))}
    </Flex>
  );
}

export default Comments;
