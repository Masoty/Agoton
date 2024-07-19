"use client";

import React, { FC } from "react";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  text: string,
  value: number,
  onClick: () => void,
  image: string,
  completed: boolean
}

const TaskButton: FC<Props> = ({ text, value, onClick, completed, image}) => {
  
  return (
      <div
          className="flex items-center pr-2 bg-lightGrey rounded-full hover:bg-grey hover:cursor-pointer transform__view"
          onClick={onClick}>
      <Image src={image} alt={""} width={50} height={50} />
      <div className="flex flex-col ml-3">
        <span className="text-[18px]">{text}</span>
        <span className="text-[12px]">+{!completed ? value : 0} AG</span>
      </div>
      <ArrowForwardIosIcon className="ml-auto" />
    </div>
  );
};

export default TaskButton;