import { blogPosts } from "@/app/contants/blog-post-page";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/navigaton/header";
import StaticAsciiBackground from "@/app/components/static-ascii-background";

export const metadata = {
  title: "Blog | Edge Detection Research",
  description:
    "Computer vision research and guides on edge detection vulnerabilities",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="absolute inset-0">
        <StaticAsciiBackground />
      </div>
      <div className="relative w-full min-h-screen overflow-hidden mt-24">
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 pt-24 space-y-8 font-mono text-black">
          <div className="bg-white border border-black p-6 w-full shadow-lg">
            <h1 className="text-4xl font-bold mb-4">
              Edge Detection Lab Research Blog
            </h1>
            <p className="leading-relaxed text-lg">
              Here you will find a collection of articles, explainers, and
              technical explanations for our project on edge detection
              vulnerabilities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/about/${post.id}`}>
                <div className="bg-white border border-black p-6 w-full shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 border border-black text-xs font-bold bg-black text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex-grow mb-6">
                    <h3 className="text-xl font-bold mb-3 leading-tight">
                      {post.title}
                    </h3>
                    <p className="leading-relaxed text-sm">
                      {post.description}
                    </p>
                  </div>
                  <div className="mt-auto border-t border-black pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {post.authors.map((author, index) => (
                          <div
                            key={index}
                            className="relative w-8 h-8 border-2 border-black bg-white"
                          >
                            <Image
                              src={author.image}
                              alt={`${author.name} avatar`}
                              fill
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex-grow">
                        <div className="font-bold text-xs">
                          By{" "}
                          {post.authors.map((author, index) => (
                            <span key={author.name}>
                              {index > 0 &&
                                index === post.authors.length - 1 &&
                                " and "}
                              {index > 0 &&
                                index < post.authors.length - 1 &&
                                ", "}
                              {author.name}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600">{post.readTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="bg-white border border-black p-6 w-full shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-black p-4 bg-gray-50">
                <h3 className="text-lg font-bold mb-3">Research Repository</h3>
                <p className="text-sm mb-4 leading-relaxed">
                  Access the full source code, datasets, and technical
                  documentation for this edge detection research project.
                </p>
                <Link
                  href="https://github.com/ethanpaneraa/cs-396-final-project"
                  target="_blank"
                  className="inline-block bg-black text-white px-3 py-2 text-xs font-bold hover:bg-gray-800 transition"
                >
                  View on GitHub →
                </Link>
              </div>

              <div className="border border-black p-4 bg-gray-50">
                <h3 className="text-lg font-bold mb-3">Interactive Demo</h3>
                <p className="text-sm mb-4 leading-relaxed">
                  Experiment with edge detection algorithms and adversarial
                  attacks in our hands-on simulation environment.
                </p>
                <Link
                  href="/simulation"
                  className="inline-block bg-black text-white px-3 py-2 text-xs font-bold hover:bg-gray-800 transition"
                >
                  Try Simulation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
