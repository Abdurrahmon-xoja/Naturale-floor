import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/data/products';
import ARPageClient from './ARPageClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ARPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ARPageClient product={product} />;
}
