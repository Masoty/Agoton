"use client";

import React, { FC, useState } from "react";
import { ModalDown } from "@/components/entities/Modal/Modal";
import Image from "next/image";
import Link from "next/link";
import { tasks } from "../../../../config";
import axios from "axios";
import useDataState from "@/components/states/useDataState";
import { useTelegram } from "@/components/middlewares/TelegramProvider";


interface TelegramTaskProps {
    open: boolean,
    setOpen: (open: boolean) => void
    chatId: number
    completed: boolean
    url: string
    description: string
    money: number
    taskName: string
}

const TelegramTask: FC<TelegramTaskProps> = ({
                                                 open,
                                                 setOpen,
                                                 completed,
                                                 chatId,
                                                 url,
                                                 description,
                                                 money,
                                                 taskName
                                             }) => {
  
  const { webApp } = useTelegram();
  
  const tasksUser = useDataState(state => state.tasks);
  const updateTasks = useDataState(state => state.updateTasks);
  const synchronizationData = useDataState(state => state.synchronizationData);
  const updateMoney = useDataState(state => state.updateMoney);
  const updateReferPercentage = useDataState(state => state.updateReferPercentage);
  
  
  const handleConfirm = () => {
    axios.post("/api/checkTelegramSubscribe", {
        query: webApp?.initData,
        chatId: chatId
    }).then(data => data.data.mes ? (
        synchronizationData(webApp?.initData as string, () => {
            // @ts-ignore
            tasksUser[taskName] = true;
          updateTasks(tasksUser);
            updateMoney(money);
            updateReferPercentage(webApp?.initData as string, money);
          setOpen(false);
        })
    ) : alert("You are not subscribe"));
  };

  return (
      <>
        <ModalDown
            open={open}
            setOpen={() => setOpen(false)}
            className="flex flex-col p-2 py-5 gap-2 border-t border-t-amber-100 rounded-tl-[50px] rounded-tr-[50px] items-center text-center justify-center"
        >
          <Image src={"/Telegram.svg"} alt={""} width={120} height={120} />
          <span className="w-1/2">
        {description}
      </span>
            
            <Link href={url} className="bg-violet text-[20px] px-7 py-1 rounded-2xl">
            Go
          </Link>
            
            <div className={`flex flex-col mt-5 ` + (completed ? "hidden" : "flex")}>
                <span className="text-[20px]">+ {money} AG</span>
            
            <button onClick={handleConfirm} className="bg-green-600 text-[20px] px-7 py-1 rounded-2xl">
              Check
            </button>
          </div>
        </ModalDown>
      </>
    
  );
};

export default TelegramTask;
