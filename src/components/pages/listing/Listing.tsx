import React from "react";
import Container from "@/components/shared/Container";
import Image from "next/image";

const Listing = () => {
  return (
    <Container className='flex size-full flex-col pt-10 w-[80%] hide'>
      <Image className='mx-auto' src={'/nav/3.svg'} alt={''} height={100} width={100}/>
      <h1 className='text-center text-2xl'>Soon</h1>
    </Container>
  );
};

export default Listing;