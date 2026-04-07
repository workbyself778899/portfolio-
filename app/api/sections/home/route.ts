import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Home from "@/app/model/Home";

export async function GET() {
  try {
    await dbConnect();
    const data = await Home.findOne();
    return NextResponse.json({ success: true, data: data || null });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// To add data in Home page
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log({body})
    const data = await Home.findOneAndUpdate({},body,{new:true, upsert: true, runValidators:true})
    
    // Sending response 
    return NextResponse.json({
      success:true,
      message:"Data is added",
      data:data
    },{status:201})
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message, message:"copy" },
      { status: 500 }
    );
  }
}
