import BookIcon from "components/BookIcon";
import React, { useState } from "react";
import { TEXT } from "utils/constant";
import { clsx } from "utils/helpers";

interface LazyImageProps extends ImagePlaceHolderProps {
  alt?: string;
  src: string | null;
}

interface ImagePlaceHolderProps {
  className?: string;
  hideNoContentText?: boolean;
}

const ImagePlaceHolder = ({
  className,
  hideNoContentText,
}: ImagePlaceHolderProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center flex-1",
        className
      )}
    >
      <BookIcon />
      {!hideNoContentText && (
        <h4 className="mb-3 text-xl font-bold tracking-tight text-gray-800">
          {TEXT.NO_COVER_AVAILABLE}
        </h4>
      )}
    </div>
  );
};

const LazyImage = ({ alt, hideNoContentText, src }: LazyImageProps) => {
  const [showErrorImg, setShowErrorImg] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return src && !showErrorImg ? (
    <div className="relative">
      <img
        className={clsx(
          "flex-1 block w-full h-auto rounded-t-lg",
          !loaded && "absolute invisible top-0"
        )}
        alt={alt}
        onError={() => setShowErrorImg(true)}
        src={src}
        onLoad={() => setLoaded(true)}
      />
      <ImagePlaceHolder
        className={!loaded ? "visible" : "hidden"}
        hideNoContentText={hideNoContentText}
      />
    </div>
  ) : (
    <ImagePlaceHolder hideNoContentText={hideNoContentText} />
  );
};

export default LazyImage;
