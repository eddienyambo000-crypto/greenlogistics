/**
 * Renders an admin-uploaded image covering its container, or the placeholder
 * fallback when no image has been set yet. Plain <img> so any Supabase Storage
 * URL works without next/image remote config.
 */
export default function SlotImage({
  src,
  alt,
  fallback,
}: {
  src?: string;
  alt: string;
  fallback: React.ReactNode;
}) {
  if (!src) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
