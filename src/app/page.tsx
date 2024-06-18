import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { Metadata } from "next";

// Starting page
const initialFrameMetadata = getFrameMetadata({
  accepts: { xmtp: "02-09-2024" },
  isOpenFrame: true,
  buttons: [
    {
      label: "Start",
      action: "post",
      target: `${process.env.NEXT_PUBLIC_BASE_URL}/survey`,
    },
  ],
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/start`,
});

export const metadata: Metadata = {
  title: "Personality Test",
  description: "Discover yourself in frames",
  other: {
    ...initialFrameMetadata,
  },
};

export default function Home() {
  return <div>Personality Test frame by Cameron, Rich, and Ry</div>;
}