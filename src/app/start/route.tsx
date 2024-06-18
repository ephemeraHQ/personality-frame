import { ImageResponse } from "next/og";
import template from "../template.json";

export async function GET(request: Request) {
  try {
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full justify-center items-center p-10 bg-[url('/assets/title.png')] bg-center">
          <div tw="flex flex-col mb-4 items-center text-5xl">
            {template.title.title_text}
          </div>
          <div tw="flex flex-col text-2xl font-bold tracking-tight text-gray-900 justify-center">
            {template.title.sub_text}
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
