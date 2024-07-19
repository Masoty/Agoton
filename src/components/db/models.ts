import mongoose, { Schema, model, models, Types } from "mongoose";
import { UserData } from "@/components/db/types";
import mongooseLong from 'mongoose-long';

mongooseLong(mongoose);

export const UserDataSchema = new Schema<UserData>({
    id: Number,
    username: String,
    refer: Number,
    referrals: [{
        id: Number,
        username: String,
        money: Number,
    }],
    day: Number,
    timeEndDay: Number,
    moneyFromReferrals: Number,
    timeReferralsClaimButton: Number,
    money: Number,
    mining: Number,
    startMiningButton: Boolean,
    timeFinishMining: Number,
    planets: Array<{
        level: number
    }>,
    lastActivity: Number,
    tasks: {
        telegram: Boolean,
        telegram1: Boolean
    }
}, {timestamps: true});

const UserDataModel = models.userData || model("userData", UserDataSchema);




export {
    UserDataModel
};