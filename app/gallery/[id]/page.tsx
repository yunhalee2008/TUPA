import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GalleryLightbox from "@/components/GalleryLightbox";
import { getGalleryAlbum, getGalleryAlbums, getPageCopy } from "@/lib/content";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((album) => ({ id: album.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await getGalleryAlbum(params.id);
  if (!album) return {};
  return { title: `${album.titleEn} — Gallery` };
}

export const revalidate = 3600;

export default async function GalleryAlbumPage({ params }: Props) {
  const album = await getGalleryAlbum(params.id);
  const copy = await getPageCopy();
  if (!album) notFound();

  return (
    <main className="site-container py-14 lg:py-20">
      <Link
        href="/gallery"
        className="text-sm text-cobalt-600 underline-offset-2 hover:underline"
      >
        {copy["갤러리 · 상세 뒤로가기"].en}
      </Link>
      <p className="mt-6 font-mono text-sm text-body/60">{album.date}</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-cobalt-900 sm:text-4xl">
        {album.titleEn}
      </h1>

      <GalleryLightbox images={album.images} title={album.titleEn} />
    </main>
  );
}
