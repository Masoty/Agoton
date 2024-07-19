import React from 'react';
import NavBar from "@/components/entities/NavBar/NavBar";
import Container from "@/components/shared/Container";
import Scoreboard from "@/components/entities/Scoreboard/Scoreboard";
import Balance from "@/components/entities/Balance/Balance";
import Farm from "@/components/entities/Farm/Farm";
import { TelegramProvider } from "@/components/middlewares/TelegramProvider";

const Home = () => {
    return (
        <div className='relative bg-galactic size-full bg-no-repeat bg-cover bg-center object-center hide'>
            <Container className='flex-col gap-3'>
                <Scoreboard/>
                <Balance/>
            </Container>
            <Farm/>
        </div>
    );
};

export default Home;