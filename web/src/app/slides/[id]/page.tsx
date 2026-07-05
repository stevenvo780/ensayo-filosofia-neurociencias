import SlideClient from "./SlideClient";

export async function generateStaticParams() {
  return [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" }
  ];
}

export default function SlidePage({ params }: { params: { id: string } }) {
  const slideIndex = parseInt(params.id, 10);

  return <SlideClient slideIndex={slideIndex} />;
}
