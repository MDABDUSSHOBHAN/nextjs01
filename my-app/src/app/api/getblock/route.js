
import connectToDB from '@/database';
import Blog from '@/model/blog';
import { NextResponse } from 'next/server';

export async function GET() {

    try {

        await connectToDB();
        const extractAlldata = await Blog.find({});
        if(extractAlldata){
            return NextResponse.json({
                success: true,
                data: extractAlldata,
            })
        }

        else{

            return NextResponse.json({
                success: false,
                message: "Somethig went Wrong! Please try again",
            });
        }

    } catch(error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Somethig went Wrong! Please try again",
        });
    }
}