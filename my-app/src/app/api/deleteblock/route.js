import Blog from "@/model/blog";
import { NextResponse } from "next/server";



// Herer is implement delete block.........
export async function DELETE(req) {

    try{
         
        const {searchParams} = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');
        if(!getCurrentBlogID){
            return NextResponse.json({
                success: false,
                message:'Blog ID not found!',
            })
        }
        
//Operate Delete Operation Here...
        const deleteCurrentBlogByID = await Blog.findByIdAndDelete(getCurrentBlogID);
        if(deleteCurrentBlogByID){

            return NextResponse.json({
                success:true,
                message:'Blog is deleted successfully'
            })
        }

        else{

            return NextResponse.json({
                success: false,
                message:'Something went wrong! Please try again',
            }) 
        }

    }catch(error){
        console.log(error);
        return NextResponse.json({
            success: false,
            message:'Something went wrong! Please try again',
        })
    }
    
}