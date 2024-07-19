"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { Fade, Modal } from "@mui/material";
import { prettifySpace } from "@/components/shared/Functions";
import useDataState from "@/components/states/useDataState";
import { miningPlanet } from "../../../../config";
import { useTelegram } from "@/components/middlewares/TelegramProvider";

interface IPlanet {
  id: number,
  name: string;
  img: string;
  price: number;
  mining: number;
}

const CardPlanet: FC<IPlanet> = ({ id, name, img, price, mining }) => {
  
  const { webApp } = useTelegram();
  
  const [open, setOpen] = useState(false);
  
  const money = useDataState(state => state.money);
  const planets = useDataState(state => state.planets);
  
  const synchronizationData = useDataState(state => state.synchronizationData);
  const updateMoney = useDataState(state => state.updateMoney);
  const updatePlanets = useDataState(state => state.updatePlanets);
  const updateMining = useDataState(state => state.updateMining);
  
  
  const Buy = () => {
    setOpen(false);
    
    if (money < price) {
      return
    }
    
    if (miningPlanet[id].levels <= planets[id].level) {
      return
    }
    
    synchronizationData(webApp?.initData as string, () => {
      updateMoney(-price)
      
      planets[id].level += 1;
      updatePlanets(planets)
      updateMining(mining)
      
    });
    
  };

  return (
      <>
        <div onClick={planets[id].level != miningPlanet[id].levels ? money > price ? () => setOpen(true) : () => {} : () => {}} className="flex flex-col bg-lightGrey py-3 items-center rounded-2xl px-3 ">
          <Image className='rounded-2xl max-w-full h-[100%] object-cover' src={img} alt={"planet"} width={150} height={150} />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col">
              <span className="text-2xl text-center ">{name}</span>
              <span className="text-center">
            {planets[id].level != miningPlanet[id].levels ? price === 0 ? "Free" : `${prettifySpace(price)} AG` : "Max"}
          </span>
            </div>
            <button
                className={`${money > price ? "bg-green-700 no-hover" : "bg-grey no-hover-grey"} w-[80%] mx-auto rounded-[10px] px-2 py-1 `}
            >
              {planets[id].level != miningPlanet[id].levels ? price === 0 ? "Free" : "Buy" : "Max"}
            </button>
          </div>
        </div>
        <Modal
            open={open}
            aria-labelledby="modal-title"
            onClose={() => setOpen(false)}
            aria-describedby="modal-description"
            className="fixed flex size-full flex-col justify-end "
        >
          <Fade in={open} timeout={{ enter: 500, exit: 500 }}>
            <div
                className={`${open ? "modal-slide-down" : "modal-slide-down-close"} h-[70vh] w-full bg-red-700 bg-bg bg-cover flex items-center justify-center border-t border-t-amber-100 rounded-tl-[50px] rounded-tr-[50px]`}
            >
              <div className="flex flex-col items-center rounded-3xl my-auto gap-2">
                <Image className='rounded-2xl max-w-full h-[100%] object-cover' src={img} alt={"planet"} width={200} height={200} />
                <div className="flex flex-col mb-1">
                  <span className="text-4xl text-center">{name}</span>
                  <span className="mt-3">Price: {price === 0 ? "Free" : `${prettifySpace(price)} AG`}</span>
                  <span>Level: {planets[id].level + 1}/10</span>
                  <span>Mining: {prettifySpace(mining)}/hour</span>
                </div>
                <button
                    className="no-hover bg-green-700 text-2xl w-full rounded-[10px] px-2 py-1 "
                    onClick={Buy}
                >
                  {price === 0 ? "Free" : "Buy"}
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </>
  );
};

export default CardPlanet;
