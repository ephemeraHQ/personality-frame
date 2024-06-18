import { ImageResponse } from "next/og";
import template from "../template.json";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const question = parseInt(url.searchParams.get("q") ?? "0", 10);
  const copy = template.questions[question].card;
  try {
    return new ImageResponse(
      (
        <div tw="flex w-full h-full items-center bg-white p-5">
          <div tw="flex flex-col bg-gray-50 h-80 w-80 mr-10">
            <img
              tw="w-full h-full object-contain"
              src={`https://picsum.photos/500/500`}
            />
          </div>
          <div tw="flex flex-col text-3xl font-bold tracking-tight text-gray-900 text-left grow">
            {copy}
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
