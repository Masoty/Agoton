import React, { FC } from "react";
import Image from "next/image";
import ImageFallback from "@/components/entities/ImageFallback/ImageFallback";

interface IFriendButton {
    id: number
    name: string,
    money: number,
}

const FriendScoreboard: FC<IFriendButton> = ({ id, name, money }) => {
  return (
    <div className='flex bg-greyRGBA rounded-full gap-3 transform__view'>
        <Image src={`/api/images/${id}.jpg`} alt={"User Photo"}
                       className={"rounded-full"} width={60} height={50} />
      <div className='flex flex-col my-auto'>
        <span className='text-[20px]'>@{name}</span>
        <span className='text-[16px] font-bold'>AG {money.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default FriendScoreboard;