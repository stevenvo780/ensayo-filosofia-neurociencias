import SlideClient from "./SlideClient";

export async function generateStaticParams() {
  return Array.from({ length: 13 }, (_, i) => ({ id: String(i) }));
}

export default function SlidePage({ params }: { params: { id: string } }) {
  const slideIndex = parseInt(params.id, 10);

  return <SlideClient slideIndex={slideIndex} />;
}
