import { ImageResponse } from "next/og";
import template from "../template.json";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const question = parseInt(url.searchParams.get("q") ?? "0", 10);
  const { text, image } = template.questions[question];
  try {
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full justify-center items-center bg-white p-1">
          <div tw="flex flex-row w-full shrink justify-center items-center bg-white">
            {image && <div tw="flex flex-col m-1 h-[300px] items-center">
              <img
                tw="h-full object-fit m-0"
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/${image}`}
              />
            </div>}
            <div tw="flex flex-col text-6xl font-bold tracking-tight text-gray-900 m-0 justify-center items-center">
              {text}
            </div>
          </div>
          <div tw="flex flex-col grow w-full justify-center items-center bg-white p-1">
          { template.questions[question].options.map((option, index) => (
            <div tw="flex flex-col text-5xl font-bold tracking-tight text-gray-900 items-left w-full mt-3 mb-0" key={question}>
              {String.fromCharCode(65 + index)}. {option}
            </div>
          ))
          }
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
