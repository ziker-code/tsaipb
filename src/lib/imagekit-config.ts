/** Konfigurasi publik ImageKit (aman dipakai di browser & server). */
export const IMAGEKIT_URL_ENDPOINT = (process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "").trim().replace(/\/+$/, "");

/** Folder induk di media library ImageKit. */
export const IMAGEKIT_ROOT = "/tsaipb";

export function isImageKitUrl(url: string | null | undefined): boolean {
  return Boolean(url && IMAGEKIT_URL_ENDPOINT && url.startsWith(`${IMAGEKIT_URL_ENDPOINT}/`));
}
