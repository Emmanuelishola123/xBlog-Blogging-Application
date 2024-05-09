import { Box } from '@chakra-ui/react';
import React from 'react';
import TipTapEditor from '../../hooks/useEditor'; 
 

function Editor() {
  return (
    <Box  maxWidth={'100%'}>
      <TipTapEditor />
    </Box>
  )
}

export default Editor