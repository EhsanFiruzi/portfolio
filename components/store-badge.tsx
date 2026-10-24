import Image from "next/image"

import type { DownloadLink, StoreId } from "@/types/project"
import { asset } from "@/lib/asset"

export const STORE_LABEL: Record<StoreId, string> = {
  myket: "Myket",
  bazaar: "Cafe Bazaar",
  googlePlay: "Google Play",
}

const STORE_IMAGE: Record<StoreId, string> = {
  myket: "myket-get-en.png",
  bazaar: "get-cafebazaar-en.png",
  googlePlay: "google-paly-download.svg",
}

/** دکمه‌ی رسمی فروشگاه. depth = عمق صفحه برای مسیر نسبی عکس (asset) */
export function StoreBadge({ download, depth = 0 }: { download: DownloadLink; depth?: number }) {
  return (
    <a
      href={download.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-md transition hover:scale-105"
    >
      <Image
        src={asset(STORE_IMAGE[download.store], depth)}
        alt={`Get it on ${STORE_LABEL[download.store]}`}
        width={150}
        height={50}
        className="h-10 w-auto object-contain"
      />
    </a>
  )
}
