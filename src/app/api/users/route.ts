import DBConnect from "@/libs/DBConnect";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server"

export const POST = async(req: Request) => {
    try {
        await DBConnect()
        const body = await req.json();
        const user = await userModel.create(body);
        return NextResponse.json( {
            user,
            message: "user created successfully"
        } , {status: 201})
    } catch (error) {
        console.error("User creation error:", error);
        return NextResponse.json({message: "error on creating user"});
    }
};

export const GET = async(req: Request) => {
    try {
        await DBConnect();
        const user = await userModel.find({});
        return NextResponse.json( {
            user,
            message: "user fetched successfully"
        } , {status: 200})
    } catch (error) {
        console.error("error on getting users", error);
        return NextResponse.json({message: "error on getting users"});
    }
}