"use client";

import { useEffect, useState } from "react";
import type { VideoEmbed } from "@/lib/modulos-conteudo";

type Props = {
  video: VideoEmbed;
  maxWidth?: string;
};

const ASPECT_PADDING: Record<NonNullable<VideoEmbed["aspectRatio"]>, string> = {
  "16:9": "56.25%",
  "9:16": "177.78%",
  "1:1": "100%",
};

/**
 * Player de video aislado vía iframe. Soporta Vturb y YouTube.
 * Cada player corre en su propio iframe — sin contaminación de scripts globales.
 */
export function VideoPlayer({ video, maxWidth }: Props) {
  const [src, setSrc] = useState<string>("about:blank");

  useEffect(() => {
    if (video.provider === "vturb") {
      const base = `https://scripts.converteai.net/${video.accountId}/players/${video.videoId}/v4/embed.html`;
      const url = new URL(base);
      url.searchParams.set("vl", window.location.href);
      setSrc(url.toString());
    } else {
      const url = new URL(
        `https://www.youtube-nocookie.com/embed/${video.videoId}`,
      );
      url.searchParams.set("rel", "0");
      url.searchParams.set("modestbranding", "1");
      setSrc(url.toString());
    }
  }, [video]);

  const defaultAspect = video.provider === "youtube" ? "16:9" : "9:16";
  const aspect = video.aspectRatio ?? defaultAspect;
  const paddingTop = ASPECT_PADDING[aspect];

  const defaultMaxWidth =
    aspect === "16:9" ? "720px" : aspect === "1:1" ? "500px" : "400px";

  const playerKey =
    video.provider === "vturb"
      ? `vturb-${video.accountId}-${video.videoId}`
      : `youtube-${video.videoId}`;

  return (
    <div className="mx-auto w-full" style={{ maxWidth: maxWidth ?? defaultMaxWidth }}>
      <div
        className="relative overflow-hidden rounded-2xl bg-black ring-1 ring-ht-gold/25"
        style={{ paddingTop }}
      >
        <iframe
          key={playerKey}
          src={src}
          title="Video"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="origin"
          frameBorder={0}
          className="absolute inset-0 size-full"
        />
      </div>
    </div>
  );
}
