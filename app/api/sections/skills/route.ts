import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Skill from "@/app/model/Skill";

export async function GET() {
  try {
    await dbConnect();
    const data = await Skill.findOne();
    return NextResponse.json({ success: true, data: data || null });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const data = await Skill.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
    });
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
