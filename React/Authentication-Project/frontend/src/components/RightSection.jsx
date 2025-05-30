import React from 'react'
import Image from './Image'

const RightSection = ({className,src}) => {
  return (
    <div className={className}>
        <Image src={src} alt="cycle Image" />
      </div>
  );
}

export default RightSection