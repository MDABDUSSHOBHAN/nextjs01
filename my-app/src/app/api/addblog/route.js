import connectToDB from "@/database"
import Blog from "@/model/blog";
import Joi from "joi";
import { NextResponse } from "next/server"


//this is for authincate object propertity.....
const AddNewBlog = Joi.object({

    title: Joi.string().required(),
    description: Joi.string().required()
})


export async function POST(req,res) {

    try{
         await connectToDB();

         const extractBologData = await req.json();
         const {title,description} = extractBologData;

         const {error} = AddNewBlog.validate({
            title,description
         })

         if(error) {
            return NextResponse.json({
                success:false,
                message:error.details[0].message,
            })
         }

         const newlyCreatedBlogItem = await Blog.create(extractBologData);

         if(newlyCreatedBlogItem){
            return NextResponse.json({
                success: true,
                message:"Blog added successfully",
            })
         }
         else
         {
            return NextResponse.json({
                success: false,
                message:"Somthing went wrong ! try again",
            
            })
         }



    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message:"Somthing went wrong ! try again",
        
        })
    }
}

