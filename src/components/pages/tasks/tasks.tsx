"use client";

import React, { useState } from "react";
import TaskButton from "@/components/entities/TaskButton/TaskButton";
import Container from "@/components/shared/Container";
import TelegramTask from "@/components/entities/Tasks/TelegramTask";
import { tasks } from "../../../../config";
import useDataState from "@/components/states/useDataState";


const Tasks = () => {
    
    const [openTelegram, setOpenTelegram] = useState(false);
    const [openTelegram1, setOpenTelegram1] = useState(false);
    const tasksUsers = useDataState(state => state.tasks)

  return (
    <div className="gap-3 flex-col flex pt-3 hide">
        <h1 className="text-2xl text-center">Tasks List</h1>

      <Container className="flex flex-col gap-2">
          <TaskButton image={'Telegram.svg'} text={tasks.telegram.name} value={tasks.telegram.money} onClick={() => setOpenTelegram(true)} completed={tasksUsers.telegram} />
          <TaskButton image={'Telegram.svg'} text={tasks.telegram1.name} value={tasks.telegram1.money} onClick={() => setOpenTelegram1(true)} completed={tasksUsers.telegram1} />
      </Container>

      <TelegramTask taskName={'telegram'} money={tasks.telegram.money} url={tasks.telegram.url} description={tasks.telegram.description} chatId={tasks.telegram.chat_id} open={openTelegram} setOpen={setOpenTelegram} completed={tasksUsers.telegram}/>
      <TelegramTask taskName={'telegram1'} money={tasks.telegram1.money} url={tasks.telegram1.url} description={tasks.telegram1.description} chatId={tasks.telegram1.chat_id} open={openTelegram1} setOpen={setOpenTelegram1} completed={tasksUsers.telegram1}/>
    </div>
  );
};

export default Tasks;
