"use client";

import { useState, useSyncExternalStore } from "react";
import { Copy, Share2 } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";

type SocialShareProps = {
  product: {
    name: string;
    url?: string;
    description?: string;
    image?: string;
  };
};

export default function SocialShare({ product }: SocialShareProps) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const [copied, setCopied] = useState(false);

  // Compute values during render (derived state)
  const shareUrl = product?.url || (isClient ? window.location.href : "");
  const shareTitle =
    product?.name || (isClient ? document.title : "Check this out");
  const nativeShareAvailable = isClient && !!navigator?.share;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: shareTitle, url: shareUrl });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Native Share (mobile friendly) */}
      {nativeShareAvailable && (
        <button
          onClick={handleNativeShare}
          className="h-8 w-8 flex items-center justify-center rounded-full border hover:bg-muted"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={28} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={shareTitle}>
        <TwitterIcon size={28} round />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={shareTitle}>
        <WhatsappIcon size={28} round />
      </WhatsappShareButton>

      <LinkedinShareButton url={shareUrl} title={shareTitle}>
        <LinkedinIcon size={28} round />
      </LinkedinShareButton>

      <EmailShareButton url={shareUrl} subject={shareTitle}>
        <EmailIcon size={28} round />
      </EmailShareButton>

      {/* Copy link */}
      <button
        onClick={handleCopyLink}
        className="h-8 w-8 flex items-center justify-center rounded-full border hover:bg-muted"
        aria-label="Copy link"
      >
        <Copy className="w-4 h-4" />
      </button>

      {copied && <span className="text-xs text-green-600 ml-1">Copied!</span>}
    </div>
  );
}
