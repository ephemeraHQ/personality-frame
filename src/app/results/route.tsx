import { getOrCreateSurvey } from "@/helpers/game";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const address = url.searchParams.get("address");
  if (!address) {
    return new Response("Address not found", { status: 500 });
  }
  const survey = await getOrCreateSurvey(address);
  if (!survey) {
    return new Response("Survey not found", { status: 500 });
  }
  try {
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                Results
              </h2>
              <div tw="flex flex-col">
                <p tw="text-gray-500 text-sm">Address: {address}</p>
                <p tw="text-gray-500 text-sm">Results: {survey.answers.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
