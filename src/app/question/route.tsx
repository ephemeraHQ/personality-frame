import { ImageResponse } from "next/og";
import template from "../template.json";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const question = parseInt(url.searchParams.get("q") ?? "0", 10);
  console.log(`../cards/${template.questions[question].card}`);
  const module = await import(`../cards/${template.questions[question].card}`);
  const Card = module.default;
  try {
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <Card/>
              </h2>
            </div>
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
