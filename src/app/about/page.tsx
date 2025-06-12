import Header from "@/app/components/navigaton/header";
import StaticAsciiBackground from "@/app/components/static-ascii-background";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="absolute inset-0">
        <StaticAsciiBackground />
      </div>
    </>
  );
}
