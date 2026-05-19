import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/data/products';
import TourPageClient from './TourPageClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function TourPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <TourPageClient product={product} />;
}
