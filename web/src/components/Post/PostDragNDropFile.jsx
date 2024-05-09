import { Box, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StyledDropZone } from "react-drop-zone";
import "../../styles/ReactDropZoneStyle.css";

const DragNDropFile = ({ banner, setBanner }) => {
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (banner) {
      // setLabel(banner.name);
      setImg(URL.createObjectURL(banner));
    }
  }, [banner]);

  return (
    <Box>
      <StyledDropZone onDrop={setBanner}>
        {img && <Image src={img} width={"100%"} maxHeight={"275px"} />}
      </StyledDropZone>
    </Box>
  );
};

export default DragNDropFile;
