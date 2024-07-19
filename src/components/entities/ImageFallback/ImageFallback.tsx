'use client'

import { FC, useState } from "react";
import Image from 'next/image';

interface IImageWithFallback {
    src: string;
    alt: string;
    fallbackSrc: string;
    className: string,
    width: number,
    height: number
}

const ImageWithFallback: FC<IImageWithFallback> = ({ src, alt, fallbackSrc, className, height, width}) => {
    const [imgSrc, setImgSrc] = useState(src);
    
    const handleError = () => {
        setImgSrc(fallbackSrc);
    };
    
    return (
        <Image
            src={imgSrc}
            alt={alt}
            height={height}
            width={width}
            onError={handleError}
            className={className}
        />
    );
};

export default ImageWithFallback;
