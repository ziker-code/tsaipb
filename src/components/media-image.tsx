"use client";

import NextImage, { type ImageProps } from "next/image";
import { Image as IKImage } from "@imagekit/next";
import { IMAGEKIT_URL_ENDPOINT, isImageKitUrl } from "@/lib/imagekit-config";

/**
 * Gambar konten (cover, galeri, foto cerita).
 * - URL ImageKit → dikirim dari CDN ImageKit (srcset responsif, format & kualitas otomatis lewat URL).
 * - URL lain (Supabase Storage lama, YouTube) → optimizer bawaan Next.js.
 */
export function MediaImage({ src, ...props }: Omit<ImageProps, "src"> & { src: string }) {
  if (isImageKitUrl(src)) {
    return <IKImage urlEndpoint={IMAGEKIT_URL_ENDPOINT} src={src} transformation={[{ quality: 80 }]} {...props} />;
  }
  return <NextImage src={src} {...props} />;
}
