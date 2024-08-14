import connectToDB from "@/database";
import Blog from "@/model/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

//this ix for authorization...

const EditBlog = Joi.object({

    title: Joi.string().required(),
    description: Joi.string().required()
})





export async function PUT(req) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');
        const { title, description } = await req.json();

        if (!getCurrentBlogID) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Blog ID is required.',
                },
                { status: 400 }
            );
        }

        const { error } = EditBlog.validate({ title, description });
        if (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Validation error: ${error.details[0].message}`,
                },
                { status: 400 }
            );
        }

        // Update the blog
        const updateBlogByBlogID = await Blog.findOneAndUpdate(
            { _id: getCurrentBlogID },
            { title, description },
            { new: true }
        );

        if (updateBlogByBlogID) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Data updated successfully.',
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Blog not found or update failed.',
                },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: 'Server error: Something went wrong! Please try again.',
            },
            { status: 500 }
        );
    }
}