import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGalleryAlbums } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo archive of lab life at TUPA — conferences, picnics, and milestones.",
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        Gallery
      </h1>
      <p className="mt-3 max-w-2xl">
        <span className="ko-only">
          학회, 소풍, 졸업, 그리고 소소한 축하까지 — TUPA의 순간들을 기록합니다.
        </span>
        <span className="en-only">
          Conferences, picnics, graduations, and small celebrations — moments of
          TUPA.
        </span>
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <Link
            key={album.id}
            href={`/gallery/${album.id}`}
            className="group overflow-hidden rounded-xl border border-mapline bg-white transition-shadow hover:shadow-md"
          >
            <Image
              src={album.cover}
              alt=""
              width={640}
              height={420}
              className="aspect-[3/2] w-full border-b border-mapline object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="p-5">
              <p className="font-mono text-xs text-body/60">{album.date}</p>
              <h2 className="mt-1.5 font-semibold leading-snug text-cobalt-900">
                {album.titleEn}
              </h2>
              <p className="mt-1 text-xs text-body/60">
                <span className="ko-only">사진 {album.images.length}장</span>
                <span className="en-only">{album.images.length} photos</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
