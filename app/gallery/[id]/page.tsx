import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryAlbum, getGalleryAlbums } from "@/lib/content";

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
  if (!album) notFound();

  return (
    <main className="site-container py-14 lg:py-20">
      <Link
        href="/gallery"
        className="text-sm text-cobalt-600 underline-offset-2 hover:underline"
      >
        ← Gallery
      </Link>
      <p className="mt-6 font-mono text-sm text-body/60">{album.date}</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-cobalt-900 sm:text-4xl">
        {album.titleEn}
      </h1>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {album.images.map((src) => (
          <Image
            key={src}
            src={src}
            alt={album.titleEn}
            width={640}
            height={480}
            className="w-full rounded-xl border border-mapline object-cover"
          />
        ))}
      </div>
    </main>
  );
}
