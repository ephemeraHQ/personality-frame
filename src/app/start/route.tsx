import { ImageResponse } from "next/og";
import template from "../template.json";

export async function GET(request: Request) {
  try {
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full justify-center items-center p-10 bg-white relative">
          <div tw="flex flex-col absolute w-80 h-80 z-0 left-1/2 ml-[-120px] top-[140px]">
            <img
              tw="h-full object-fit"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/${template.title.image}`}
            />
          </div>
          <div tw="flex flex-col mb-4 items-center text-5xl relative z-10">
            {template.title.title_text}
          </div>
          <div tw="flex flex-col text-2xl font-bold tracking-tight text-gray-900 justify-center relative z-10">
            {template.title.sub_text}
          </div>
          
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
