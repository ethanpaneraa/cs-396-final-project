import Header from "@/app/components/navigaton/header";
import StaticAsciiBackground from "@/app/components/static-ascii-background";

export default function ComputerVisionSafetyBlogPost() {
  return (
    <>
      <Header />
      <div className="absolute inset-0">
        <StaticAsciiBackground />
      </div>
      <div className="relative w-full min-h-screen overflow-hidden mt-24"></div>
    </>
  );
}
