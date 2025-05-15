import Image from "next/image";

export default function Page() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      className="h-10 w-auto hover:h-200"
    />
  );
}
