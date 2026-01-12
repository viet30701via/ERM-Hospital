import Image from "next/image";

export default function Avatar({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
      <Image
        src={src || "/default-avatar.png"} // File này nên để trong thư mục /public
        alt={alt}
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88f79fwAJiAPN9B/pqQAAAABJRU5ErkJggg=="
      />
    </div>
  );
}
