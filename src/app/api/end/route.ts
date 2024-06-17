import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { NextRequest, NextResponse } from "next/server";

const confirmationFrameHtml = getFrameHtmlResponse({
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?page=2`,
  isOpenFrame: true,
  accepts: {
    xmtp: "02-09-2024",
  },
});

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { isValid } = await getXmtpFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(confirmationFrameHtml);
}
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
