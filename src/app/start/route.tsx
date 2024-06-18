import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  try {
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="flex flex-col text-3xl font-bold tracking-tight text-gray-900 text-left">
            Welcome to the survey
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
