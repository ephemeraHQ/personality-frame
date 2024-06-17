import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { Metadata } from "next";

// Starting page
const frameMetadata = getFrameMetadata({
  accepts: { xmtp: "02-09-2024" },
  isOpenFrame: true,
  buttons: [
    {
      label: "Go to next page",
      action: "post",
      target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/end`,
    },
  ],
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?page=1`,
});

export const metadata: Metadata = {
  title: "Dummy Frame",
  description: "A bare bones frame",
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return <h1>Dummy Frame</h1>;
}