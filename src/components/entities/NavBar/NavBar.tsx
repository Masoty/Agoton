import React from 'react';
import Image from "next/image";
import Container from "@/components/shared/Container";
import Link from "next/link";

const NavBar = () => {
    return (
        <Container className='fixed bottom-3'>
            <div className={'flex border border-white rounded-full p-3 px-5 w-full justify-between bg-black'}>
                <Link href={'/'} className='flex flex-col items-center'>
                    <Image src={'/nav/1.svg'} width={30} height={30} alt={''}/>
                    <span>Home</span>
                </Link>
                <Link href={'/mine'} className='flex flex-col items-center'>
                    <Image src={'/nav/2.svg'} width={30} height={30} alt={''}/>
                    <span>Mine</span>
                </Link>
                <Link href={'/listing'} className='flex flex-col items-center -mt-5'>
                    <Image src={'/nav/3.svg'} width={50} height={50} alt={''}/>
                    <span>Listing</span>
                </Link>
                <Link href={'/tasks'} className='flex flex-col items-center'>
                    <Image src={'/nav/4.svg'} width={30} height={30} alt={''}/>
                    <span>Tasks</span>
                </Link>
                <Link href={'/friends'} className='flex flex-col items-center'>
                    <Image src={'/nav/5.svg'} width={30} height={30} alt={''}/>
                    <span>Friends</span>
                </Link>
            </div>
        </Container>
    );
};

export default NavBar;