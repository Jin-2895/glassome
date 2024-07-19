import React, { FC, useState } from "react";
import Image, { ImageProps } from "next/image";
import DefaultImage from "../../../assets/images/main-logo.png";

interface ImageWithErrorProps extends ImageProps {}

const ImageWithError: FC<ImageWithErrorProps> = ({ src, alt, ...rest }) => {
  const [imageError, setImageError] = useState(false);

  return (
    // eslint-disable-next-line
    <>
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          {...rest}
        />
      ) : (
        <Image src={DefaultImage.src} alt={alt} {...rest} />
      )}
    </>
  );
};

export { ImageWithError };
