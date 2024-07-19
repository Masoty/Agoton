import type {NextRequest} from "next/server";
import { ZodArray, ZodObject, ZodSchema } from "zod";
import mongoose from "mongoose";

export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatTimeLeft(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    if (formattedHours === '00' && formattedMinutes === '00') {
        return `${formattedSeconds}s`;
    } else if (formattedHours === '00' && formattedMinutes !== '00') {
        return `${formattedMinutes}m ${formattedSeconds}s`;
    }

}

export function calculatePercentage(value: number, percentage: number): number {
    return parseFloat((value * (percentage / 100)).toFixed(2));
}


export function addSecondsToUnixTime(seconds: number): number {
    const currentUnixTime = Math.floor(Date.now() / 1000);
    return currentUnixTime + seconds;
}

export function secondsUntilUnixTime(targetUnixTime: number): number {
    const currentUnixTime = Math.floor(Date.now() / 1000);
    return targetUnixTime - currentUnixTime;
}

export function prettify(number: number) {
    const n = number.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ",");
}

export function prettifySpace(number: number) {
    const n = number.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
}

export function daysFromNow(unixTimestamp: number) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const differenceInSeconds = Math.abs(currentTimestamp - unixTimestamp);
    return differenceInSeconds / (60 * 60 * 24);
}

export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function transformData<T>(data: any, schema: ZodSchema<T>): T {
    const parsedData = {};
    const shape = (schema as any)._def.shape();
    for (const key of Object.keys(shape)) {
        if (key in data) {
            // @ts-ignore
            parsedData[key as keyof T] = data[key];
        }
    }
    return parsedData as T;
}

export function calculateFinalPrice(startPrice: number, level: number, percent: number): number {
    let finalPrice = startPrice;
    for (let i = 1; i <= level; i++) {
        finalPrice += finalPrice * (percent / 100);
    }
    return parseFloat(finalPrice.toFixed(2));
}


