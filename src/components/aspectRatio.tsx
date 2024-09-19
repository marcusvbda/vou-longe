"use client";

import { useState, memo } from "react";
import Image from "next/image";

interface IProps {
  src: string;
  alt?: string;
  className?: string;
  size: {
    width?: string | number;
    height?: string | number;
  };
}

const AspectRatio: React.FC<IProps> = ({ src, alt, size, className }) => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const processedAlt = alt || (src.split("/").pop() as string).split(".")[0];

  return (
    <div
      className={className}
      style={{
        ...size,
        position: "relative",
        ...(aspectRatio ? { aspectRatio: `${aspectRatio}` } : {}),
        overflow: "hidden",
        minHeight: 0.5,
      }}
    >
      <Image
        src={src}
        alt={processedAlt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={({ nativeEvent }: any) => {
          const { naturalWidth, naturalHeight } = nativeEvent.target;
          setAspectRatio(naturalWidth / naturalHeight);
        }}
      />
    </div>
  );
};

export default memo(AspectRatio);
