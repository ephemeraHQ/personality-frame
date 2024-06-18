import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { Metadata } from "next";
import template from "./template.json";

// Starting page
const initialFrameMetadata = getFrameMetadata({
  accepts: { xmtp: "02-09-2024" },
  isOpenFrame: true,
  buttons: [
    {
      label: template.title.options[0],
      action: "post",
      target: `${process.env.NEXT_PUBLIC_BASE_URL}/survey`,
    },
  ],
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/start`,
});

export const metadata: Metadata = {
  title: "Super Personality Test",
  description: "Discover your super power in frames",
  other: {
    ...initialFrameMetadata,
  },
};

export default function Home() {
  return <div>Super Personality Test frame by Cameron, Rich, and Ry</div>;
}