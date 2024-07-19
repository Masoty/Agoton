"use client";

import React from "react";
import Balance from "@/components/entities/Balance/Balance";
import MiningScoreboard from "@/components/entities/Scoreboard/MiningScoreboard";
import CardPlanet from "@/components/entities/CardPlanet/CardPlanet";
import Container from "@/components/shared/Container";
import useDataState from "@/components/states/useDataState";
import { miningPlanet } from "../../../../config";
import { calculateFinalPrice } from "@/components/shared/Functions";

const Mine = () => {
    
    const planets = useDataState(state => state.planets)
    
    return (
        <div className="flex flex-col py-4 hide">
            
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl text-center font-medium tracking-wider">Balance</h1>
                <Balance />
                <MiningScoreboard />
            </div>
            
            <Container className="grid grid-cols-2 gap-2 mt-5 mb-32">
                
                {miningPlanet.map((planet) => (
                    <CardPlanet key={planet.id} id={planet.id} name={planet.name} img={planet.image} price={calculateFinalPrice(planet.startPrice, planets[planet.id].level, 25 )} mining={calculateFinalPrice(planet.startProfit, planets[planet.id].level, 5 )} />
                ))}
            
            </Container>
        
        </div>
  );
};

export default Mine;