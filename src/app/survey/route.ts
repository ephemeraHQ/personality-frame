import { FrameButtonMetadata, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { NextRequest, NextResponse } from "next/server";
import template from "../template.json";
import { updateSurvey } from "@/helpers/game";

type Question = {
  text: string;
  options: string[];
};

const getFrameResponse = async (question: Question | undefined, questionNumber: number, address: string) => {
  if (question) {
    const options: FrameButtonMetadata[] = question.options.map((label, idx) => ({
      label,
      action: "post",
      target: `${process.env.NEXT_PUBLIC_BASE_URL}/survey?q=${questionNumber + 1}&pa=${idx}`,
    }));
    const [option0, ...rest] = options;

    return getFrameHtmlResponse({
      image: `${process.env.NEXT_PUBLIC_BASE_URL}/question?q=${questionNumber}`,
      isOpenFrame: true,
      accepts: {
        xmtp: "02-09-2024",
      },
      buttons: [ option0, ...rest ]
    })
  }

  return getFrameHtmlResponse({
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/results?address=${address}`,
    isOpenFrame: true,
    accepts: {
      xmtp: "02-09-2024",
    }
  })
};

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const url = new URL(req.url);
  const questionNumber = parseInt(url.searchParams.get("q") ?? "0", 10);
  const { isValid, message } = await getXmtpFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const previousQuestion = template.questions[questionNumber - 1];
  const previousAnswer = url.searchParams.get("pa");
  if (previousQuestion && previousAnswer) {
    await updateSurvey(message!.verifiedWalletAddress, questionNumber - 1, parseInt(previousAnswer, 10));
  }

  const question = template.questions[questionNumber];
  const response = await getFrameResponse(question, questionNumber, message!.verifiedWalletAddress);

  return new NextResponse(response);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
