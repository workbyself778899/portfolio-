import Home from "@/app/model/Home";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    try {
        await dbConnect();
        const data= await Home.findOne().select("tag");
        return NextResponse.json({
            data,
            message:"Showing data from tags"
        })
    } catch (error:unknown) {
        const message= error instanceof Error? error.message:"Unknown error";
        return NextResponse.json({
            success:false,
            error:message,
            status:500
        });
    }
}

// add the tag 
// "response:NextResponse" this cann't be written here
export async function POST(request:NextRequest ){
    try {
        await dbConnect();
        const {tag} = await request.json();
        const update = await Home.findOneAndUpdate(
            {},
            { $addToSet:{tag:tag} }, // Prevents duplicate data
            {
                returnDocument:"after", // updated data send gara
                upsert:true  // if data xaina new create gara
            }
        );

         return NextResponse.json({
            success:true,
            message:"Tag Added",
            data:update?.tag,
        }, {status:200})

    } catch (error: unknown) {
        const message = error instanceof Error? error.message:"Unknown error";
        return NextResponse.json({
            error:message,
            success:false,
            status:500
        })
    }
}

// delete tags
export async function DELETE(request:NextRequest){
try {
    const {tag} = await request.json();
    if(!tag)
        return NextResponse.json({
    success:false,
    message:"Tag is required",
    },
    {status:400})


    // Remove Tag
    const update = await Home.findOneAndUpdate({},
        {$pull:{tag:tag}}, // remove tag
        {returnDocument:"after"}
    )

    return NextResponse.json({
        success:true,
        message:"Tag is deleted",
        data: update?.tag,
    },{status:200});

} catch (error:unknown) {
    const message = error instanceof Error? error.message : "Unknown Error" ;
    return NextResponse.json({
        error:message,
        success:false,
        status:500
    })
}
}