import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { NextRequest, NextResponse } from "next/server";

const confirmationFrameHtml = (question: number) => {
  return getFrameHtmlResponse({
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/question?q=${question}`,
    isOpenFrame: true,
    accepts: {
      xmtp: "02-09-2024",
    },
    buttons: [
      {
        label: "Option 1",
        action: "post",
        target: `${process.env.NEXT_PUBLIC_BASE_URL}/survey?q=${question + 1}&pa=0`,
      },
      {
        label: "Option 2",
        action: "post",
        target: `${process.env.NEXT_PUBLIC_BASE_URL}/survey?q=${question + 1}&pa=1`,
      },
    ],
  })
};

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const url = new URL(req.url);
  const question = parseInt(url.searchParams.get("q") ?? "0", 10);
  const answer = url.searchParams.get("a");
  const { isValid } = await getXmtpFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(confirmationFrameHtml(question));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
