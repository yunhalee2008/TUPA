import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Copy from "@/components/Copy";
import { getGalleryAlbums, getPageCopy } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy();
  return {
    title: copy["갤러리 · 탭 제목(SEO)"].en,
    description: copy["갤러리 · 검색 설명(SEO)"].en,
  };
}

export const revalidate = 3600;

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();
  const copy = await getPageCopy();

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        {copy["갤러리 · 페이지 제목"].en}
      </h1>
      <p className="mt-3 max-w-2xl">
        <Copy t={copy["갤러리 · 페이지 소개"]} />
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
