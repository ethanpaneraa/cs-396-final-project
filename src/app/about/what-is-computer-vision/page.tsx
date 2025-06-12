"use client";

import Header from "@/app/components/navigaton/header";
import StaticAsciiBackground from "@/app/components/static-ascii-background";
import Link from "next/link";
import { useState } from "react";

export default function WhatIsComputerVisionBlogPost() {
  const [showTOC, setShowTOC] = useState(false);

  return (
    <>
      <Header />
      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <StaticAsciiBackground />
        </div>
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 pt-24 font-mono text-black">
          <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="bg-white border border-black p-4 shadow-lg max-w-xs">
              <h3 className="text-sm font-bold mb-3 border-b border-black pb-2">
                TABLE OF CONTENTS
              </h3>
              <nav className="space-y-2 text-xs">
                <a
                  href="#introduction"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Introduction
                </a>
                <a
                  href="#why-edges"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Why Care About Edges?
                </a>
                <a
                  href="#sobel-overview"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Sobel: The Fast Sketch Artist
                </a>
                <a
                  href="#canny-overview"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Canny: The Perfectionist
                </a>
                <a
                  href="#when-to-choose"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → When to Choose One?
                </a>
                <a
                  href="#playing-around"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Playing Around
                </a>
                <a
                  href="#works-cited"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Works Cited
                </a>
              </nav>
            </div>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="lg:hidden bg-white border border-black p-4 w-full shadow-lg">
              <button
                onClick={() => setShowTOC(!showTOC)}
                className="w-full text-left font-bold text-sm bg-black text-white p-2 hover:bg-gray-800 transition"
              >
                {showTOC
                  ? "↑ HIDE TABLE OF CONTENTS"
                  : "↓ SHOW TABLE OF CONTENTS"}
              </button>
              {showTOC && (
                <nav className="mt-4 space-y-2 text-xs border-t border-black pt-4">
                  <a
                    href="#introduction"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → Introduction
                  </a>
                  <a
                    href="#why-edges"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → Why Care About Edges?
                  </a>
                  <a
                    href="#sobel-overview"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → Sobel: The Fast Sketch Artist
                  </a>
                  <a
                    href="#canny-overview"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → Canny: The Perfectionist
                  </a>
                  <a
                    href="#when-to-choose"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → When to Choose One?
                  </a>
                  <a
                    href="#playing-around"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → Playing Around
                  </a>
                  <a
                    href="#works-cited"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → Works Cited
                  </a>
                </nav>
              )}
            </div>
            <div className="bg-white border border-black p-6 w-full shadow-lg">
              <h1 className="text-4xl font-bold mb-4">
                What is Computer Vision?
              </h1>
              <p className="text-sm text-gray-600">
                By Ethan Pineda • 12 min read
              </p>
            </div>
            <div
              id="introduction"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <p className="leading-relaxed mb-4">
                Understanding how computers trace the outlines of what they
                &quot;see&quot; is one of the first steps that we need to take
                when trying to learn and understand computer vision. Both of the
                main edge detection models that we used in this project, Sobel
                and Canny, are considered to be the &quot;classic&quot; vision
                algorithms because they laid the ground work for future, and
                more advanced computer vision models (that use things like
                convolution neural networks
                <sup>[1]</sup>).
              </p>
              <p className="leading-relaxed mb-4">
                The main idea behind both Sobel and Canny edge detection though,
                is that both algorithms has the same general principle when it
                comes to their implementation: take a raw image and return a
                black and white &quot;edge map&quot; (outlines of all of the
                edges of the objects in the images). However, where they differ
                is Sobel sacrifices accuracy for speed whereas Canny runs slower
                but yields better edge maps.
              </p>
              <p className="leading-relaxed">
                Keep on reading to learn more about what each algorithm
                specifically does, how it does it, and when you might pick one
                over the other.
              </p>
            </div>
            <div
              id="why-edges"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                Why do we care about edges in the first place?
              </h2>
              <p className="leading-relaxed mb-4">
                Start off considering how when light hits your phone&apos;s
                camera sensor, it turns that light into millions, or even
                billions of different numbers. Though, for most people, those
                numbers are all somewhat similar to each other, especially when
                you look at their neighbors. An <strong>edge</strong> in that
                photo that you took is where in the pattern of millions of
                numbers, there&apos;s a sudden change for example, like a sharp
                line of a skyline against the sky or the letters popping out
                from a street sign.
              </p>
              <p className="leading-relaxed mb-4">
                If you focus on these edges, then it opens the doors to one of
                the compress tricks that is used in edge detection because you
                can slash away at some of the image data and only look at what
                you care about (the edges) and strip away the boring pixels that
                don&apos;t add any new information while still keeping the
                shapes that your edge detection models care more about.
              </p>
              <p className="leading-relaxed mb-4">
                This is why for many beginner guides and blogs about edge
                detection talk about edge detection as a{" "}
                <strong>boundary finding shortcut</strong> for jobs that can
                range from simple object recognition to medical-image
                segmentation<sup>[2]</sup>.
              </p>
              <p className="leading-relaxed">
                Even cutting-edge vision models still lean on the same old
                trick. During preprocessing phase where raw images are cleaned,
                resized, and normalized before they go into the neural network
                many pipelines also compute an edge map. This extra channel
                highlights just the boundary pixels, letting the network focus
                on shape cues while skipping over the boring, redundant regions.
                The result is faster convergence and, in many cases, a small but
                measurable boost in accuracy<sup>[3]</sup>.
              </p>
            </div>
            <div
              id="sobel-overview"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                An Overview of Sobel Edge Detection: The Fast Sketch Artist
              </h2>
              <p className="leading-relaxed mb-4">
                First invented in 1968, Stanford researcher Irwin Sobel
                <sup>[4]</sup> would <strong>literally</strong> draw two smaller
                3 x 3 grids on a piece of graphing paper. One grid for
                horizontal change and the other for vertical change and put
                those values into the <em>mainframe</em> (yeah that&apos;s what
                computers were called back then). The values would look
                something like this:
              </p>

              <div className="bg-gray-100 border border-black p-4 mb-4">
                <pre className="text-sm">
                  {`[-1  0  1]          [-1 -2 -1]
[-2  0  2]   and    [ 0  0  0]
[-1  0  1]          [ 1  2  1]`}
                </pre>
              </div>

              <p className="leading-relaxed mb-4">
                The idea here was that by giving the middle row (or column)
                double the weight, then the tiny brightness jitters would
                average out, while the things that we were looking for would
                stand taller (be brighter). Sobel&apos;s program did this for
                every pixel, recorded their responses as an{" "}
                <code className="bg-gray-200 px-1">xx</code> and{" "}
                <code className="bg-gray-200 px-1">yy</code> gradient and then
                would measure the length of the gradient and normally a big
                number in that calculation meant that you found an edge. If you
                then took the square root and threshold calculation, then you
                had a pretty quick sketch of the boundary boxes of your image
                with arguably, not a lot of fancy math behind it<sup>[5]</sup>.
              </p>
              <p className="leading-relaxed mb-4">
                That frugal style of math let this program live on very limited
                1970-era mainframes (computers) and finish their work in seconds
                but the beauty of Sobel is that it is simple enough that it can
                easily fit on more modern day Microcontrollers, Raspberry
                Pi&apos;s, etc.
              </p>
              <p className="leading-relaxed">
                This comes with a tradeoff though, because the built in blurring
                effect that Sobel creates can sometimes make the edges too
                chunky and this can end up masquerading a structure unless you
                preprocess the image first to remove noise from it (noise are
                the things you don&apos;t want in the image). Even though some
                changes have been made to the Sobel algorithm since it was
                created to address some of its limitations, the core of the
                algorithm is still the same<sup>[6]</sup>.
              </p>
            </div>
            <div
              id="canny-overview"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                An Overview on Canny Edge Detection: The Perfectionist
              </h2>
              <p className="leading-relaxed mb-4">
                When John Canny<sup>[7]</sup> set out in 1986 to define an
                optimal edge detection algorithm, he listed out the following
                goals:
              </p>

              <div className="border border-black p-4 mb-4 bg-gray-50">
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Detect <strong>all</strong> of the real edges
                  </li>
                  <li>Pin the edges to exactly one pixel</li>
                  <li>Keep false positives minimal</li>
                  <li>
                    Achieve reliable performance even in noisy or low-contrast
                    images
                  </li>
                </ol>
              </div>

              <p className="leading-relaxed mb-4">
                To achieve these goals, he proposed a pipeline that consisted of{" "}
                <strong>five</strong> different stages. First, he used a
                Gaussian Blur<sup>[8]</sup> to get rid of any noise that can
                potentially mask itself as an edge. He also used a Sobel
                inspired gradient to measure how quick (how dramatically) the
                brightness changes at every pixel. He then uses a{" "}
                <strong>Non-maximum suppression</strong> to trim the thick
                gradient ridges to be super small and thin (so that everything
                is calculated to the exact pixel). Next comes a{" "}
                <strong>double threshold</strong> where strong areas in the
                image where the brightness changed are locked in as considered
                being edge and weaker ones are tagged as maybes. And finally, he
                applies a hysteresis<sup>[9]</sup> that keeps neighbors between
                pixels that only keeps the maybes from the previous step if they
                touch a strong neighbor (a bright pixel)
                <sup>[9,10]</sup>.
              </p>
              <p className="leading-relaxed mb-4">
                That&apos;s of course, a lot of different steps and math
                operations/transformations that we&apos;re doing with Canny and
                this means that when it comes to testing, you need to tune two
                different <strong>thresholds</strong> instead of one. Which for
                modern laptops and CPUs, this is nothing, but this is different
                for smaller devices (think your printer). The battery drain on
                smaller devices can make an edge detection algorithm like Canny
                less appealing.
              </p>
              <p className="leading-relaxed">
                Still though, the payoff of this edge map that can still be
                trusted even with shadows, different kinds of fabric, small
                noise from sensors. This makes Canny appealing for surgeons, for
                example, who use Canny to trace blood-vessel walls
                <sup>[11]</sup>.
              </p>
            </div>
            <div
              id="when-to-choose"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                When Should I Choose One Over the Other?
              </h2>
              <p className="leading-relaxed mb-4">
                If at the start of your computer science career, you ever find
                yourself trying to build a robot that follows a black line with
                tape, then potentially Sobel&apos;s single threshold and lower
                arithmetic complexity might get your car to move along the track
                faster.
              </p>
              <p className="leading-relaxed mb-4">
                But maybe if you&apos;re doing more complex tasks (like dealing
                with patients, or safety), perhaps Canny might be more of use.
                Even though it&apos;s a heavier load on the hardware, you could
                always just <em>throw better hardware at it :)</em>
              </p>
              <p className="leading-relaxed">
                In any case, many real times do use this technology, especially
                Sobel because of how quick it is to prototype with it which
                makes it really great for say, hackathons and of course, swap to
                Canny once accuracy becomes a harder problem for you and your
                team<sup>[12]</sup>.
              </p>
            </div>
            <div
              id="playing-around"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                Playing Around with Sobel and Canny
              </h2>
              <p className="leading-relaxed mb-4">
                You might read this article and wonder how you can get started
                with tinkering with these technologies. The nice thing about
                Computer Science, especially in the AI/ML field is that a lot of
                these algorithms and libraries are all{" "}
                <strong>open source</strong> and <strong>free to use</strong>.
              </p>
              <p className="leading-relaxed mb-4">
                In Python&apos;s OpenCV you can write three lines: read an
                image, <code className="bg-gray-200 px-1">cv.Sobel(...)</code>{" "}
                or <code className="bg-gray-200 px-1">cv.Canny(...)</code>, and{" "}
                <code className="bg-gray-200 px-1">imshow</code>. You can adjust
                Sobel&apos;s one threshold and watch chunky outlines pop in and
                out; then give Canny different high-and-low pairs and see how
                hysteresis either links faint edges into smooth curves or erases
                them entirely. These experiments turn abstract kernels into
                intuitive pictures on your screen and that intuition will stay
                handy long after you move on to convolutional neural nets.
              </p>
              <p className="leading-relaxed italic">
                We also have another article that talks more about how we
                generated the data for this lab simulation!
              </p>
            </div>
            <div
              id="works-cited"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">Works Cited</h2>
              <div className="space-y-2 text-sm">
                <p>
                  [1] GeeksforGeeks. &quot;Introduction to Convolution Neural
                  Network.&quot;{" "}
                  <Link
                    href="https://www.geeksforgeeks.org/introduction-convolution-neural-network/"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://www.geeksforgeeks.org/introduction-convolution-neural-network/
                  </Link>
                </p>

                <p>
                  [2] GeeksforGeeks. &quot;What is Edge Detection in Image
                  Processing?&quot;{" "}
                  <Link
                    href="https://www.geeksforgeeks.org/what-is-edge-detection-in-image-processing/"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://www.geeksforgeeks.org/what-is-edge-detection-in-image-processing/
                  </Link>
                </p>

                <p>
                  [3] Roboflow Blog. &quot;Edge Detection.&quot;{" "}
                  <Link
                    href="https://blog.roboflow.com/edge-detection/"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://blog.roboflow.com/edge-detection/
                  </Link>
                </p>

                <p>
                  [4] Wikipedia. &quot;Irwin Sobel.&quot;{" "}
                  <Link
                    href="https://en.wikipedia.org/wiki/Irwin_Sobel"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://en.wikipedia.org/wiki/Irwin_Sobel
                  </Link>
                </p>

                <p>
                  [5] Wikipedia. &quot;Sobel Operator.&quot;{" "}
                  <Link
                    href="https://en.wikipedia.org/wiki/Sobel_operator"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://en.wikipedia.org/wiki/Sobel_operator
                  </Link>
                </p>

                <p>
                  [6] University of Edinburgh. &quot;Sobel Edge Detector.&quot;{" "}
                  <Link
                    href="https://homepages.inf.ed.ac.uk/rbf/HIPR2/sobel.htm"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://homepages.inf.ed.ac.uk/rbf/HIPR2/sobel.htm
                  </Link>
                </p>

                <p>
                  [7] Wikipedia. &quot;John Canny.&quot;{" "}
                  <Link
                    href="https://en.wikipedia.org/wiki/John_Canny"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://en.wikipedia.org/wiki/John_Canny
                  </Link>
                </p>

                <p>
                  [8] TutorialsPoint. &quot;OpenCV - Gaussian Blur.&quot;{" "}
                  <Link
                    href="https://www.tutorialspoint.com/opencv/opencv_gaussian_blur.htm"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://www.tutorialspoint.com/opencv/opencv_gaussian_blur.htm
                  </Link>
                </p>

                <p>
                  [9] OpenCV Documentation. &quot;Canny Edge Detection.&quot;{" "}
                  <Link
                    href="https://docs.opencv.org/4.x/da/d22/tutorial_py_canny.html"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://docs.opencv.org/4.x/da/d22/tutorial_py_canny.html
                  </Link>
                </p>

                <p>
                  [10] Justin Liang. &quot;Canny Edge Detection Tutorial.&quot;{" "}
                  <Link
                    href="https://justin-liang.com/tutorials/canny/"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://justin-liang.com/tutorials/canny/
                  </Link>
                </p>

                <p>
                  [11] PMC. &quot;Blood Vessel Segmentation Methods.&quot;{" "}
                  <Link
                    href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8512020/"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC8512020/
                  </Link>
                </p>

                <p>
                  [12] OpenCV. &quot;Edge Detection Using OpenCV.&quot;{" "}
                  <Link
                    href="https://opencv.org/blog/edge-detection-using-opencv/"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://opencv.org/blog/edge-detection-using-opencv/
                  </Link>
                </p>
              </div>
            </div>
            <div className="bg-white border border-black p-6 w-full shadow-lg text-center">
              <Link
                href="/blog"
                className="inline-block bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition mr-4"
              >
                ← Back to Blog
              </Link>
              <Link
                href="/simulation"
                className="inline-block bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition"
              >
                Try the Simulation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
