import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const projectCountry = formData.get("projectCountry") as string;
    const message = formData.get("message") as string;
    const productName = formData.get("productName") as string;

    // Extract uploaded files
    const files = formData.getAll("files") as File[];
    const fileMetadata = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    // TODO: Integrate with Cloudflare R2 or AWS S3 for file storage
    // const uploadResults = await uploadToR2(files);
    // const downloadLinks = uploadResults.map(r => r.url);

    // TODO: Send notification via Resend Email or Telegram Bot API
    // await sendNotification({
    //   company,
    //   email,
    //   projectCountry,
    //   message,
    //   productName,
    //   fileMetadata,
    //   downloadLinks,
    // });

    const projectRef = `EXPR-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      projectRef,
      message: "Project submitted successfully. Our engineering team will respond within 12 business hours.",
      filesReceived: fileMetadata.length,
    });
  } catch (error) {
    console.error("Project submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your submission. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
