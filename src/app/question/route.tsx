import { ImageResponse } from "next/og";
import template from "../template.json";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const question = parseInt(url.searchParams.get("q") ?? "0", 10);
  const { text, image } = template.questions[question];
  try {
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full justify-center items-center bg-white p-10">
          {image && <div tw="flex flex-col mb-16 h-3/5 items-center">
            <img
              tw="h-full object-fit"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/${image}`}
            />
          </div>}
          <div tw="flex flex-col text-4xl font-bold tracking-tight text-gray-900 items-center">
            {text}
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
