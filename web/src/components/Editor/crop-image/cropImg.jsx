import React, { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";
import { Button, Input, FileInput, Avatar, Switch, Flex } from "@mantine/core";
import { TbUpload } from "react-icons/tb";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default function CropImg(props) {
  const { editor, close } = props;

  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);

  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const blobUrlRef = useRef("");

  function onSelectFile(file) {
    setCrop(undefined); // Makes crop preview update between images.
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      setImgSrc(reader.result?.toString() || ""),
    );
    reader.readAsDataURL(file);
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  }

  const uploadRef = useRef(null);

  function handleInsertImg() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }
    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      // hiddenAnchorRef.current!.href = blobUrlRef.current
      // hiddenAnchorRef.current!.click()
      editor?.chain().focus().setImage({ src: blobUrlRef.current }).run();
      console.log(blobUrlRef.current);
    });
    close();
  }

  return (
    <div className="App">
      <div className="Crop-Controls">
        {/* <input type="file" accept="image/*" onChange={onSelectFile} style='display: none' /> */}
        <FileInput
          accept="image/*"
          ref={uploadRef}
          onChange={(e) => onSelectFile(e)}
          style={{ display: "none" }}
        />
        <Flex gap="md" justify="flex-start" align="center" mb={8}>
          <Avatar
            color="blue"
            radius="sm"
            style={{ cursor: "pointer" }}
            onClick={() => uploadRef.current.click()}
          >
            <TbUpload size="1.5rem" />
          </Avatar>
          Click to select image to crop
        </Flex>
        <Flex gap="md" justify="flex-start" align="center" mb={8}>
          <label htmlFor="scale-input">Scale: </label>
          <Input
            id="scale-input"
            type="number"
            // defaultValue={1}
            min={1}
            step={0.1}
            // max={1}
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
            placeholder="Scale"
          />
        </Flex>
        <Flex gap="md" justify="flex-start" align="center" mb={8}>
          <label htmlFor="rotate-input">Rotate: </label>
          <Input
            id="rotate-input"
            type="number"
            // defaultValue={1}
            min={1}
            step={0.1}
            // max={1}
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
            placeholder="Rotate"
          />
        </Flex>
        <div>
          <Flex
            mih={50}
            bg="rgba(0, 0, 0, .3)"
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            Toggle aspect{" "}
            <Switch
              onLabel="ON"
              offLabel="OFF"
              onClick={handleToggleAspectClick}
            />
          </Flex>
        </div>
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{
              transform: `scale(${scale}) rotate(${rotate}deg)`,
              marginBottom: "2rem",
              marginTop: "2rem",
            }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <Button onClick={handleInsertImg}>Done</Button>
        </>
      )}
    </div>
  );
}
