import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Home from "@/app/model/Home";

// DELETE /api/sections/home/tag?value=tagToDelete
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tagToDelete = searchParams.get("value");
  if (!tagToDelete) {
    return NextResponse.json({ success: false, error: "Missing tag value" }, { status: 400 });
  }
  try {
    await dbConnect();
    const data = await Home.findOneAndUpdate(
      {},
      { $pull: { tag: tagToDelete } },
      { new: true }
    );
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
