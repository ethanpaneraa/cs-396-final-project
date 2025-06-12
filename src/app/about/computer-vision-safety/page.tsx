"use client";

import Header from "@/app/components/navigaton/header";
import StaticAsciiBackground from "@/app/components/static-ascii-background";
import Link from "next/link";
import { useState } from "react";

export default function ComputerVisionSafetyBlogPost() {
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
                  href="#why-ai-safety"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Why AI Safety Matters
                </a>
                <a
                  href="#how-models-fooled"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → How Models Can Be &quot;Fooled&quot;
                </a>
                <a
                  href="#mistakes-without-attackers"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Mistakes Without Attackers
                </a>
                <a
                  href="#llms-role"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Where LLMs Come Into Play
                </a>
                <a
                  href="#your-role"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Where You Come Into Play
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
                    href="#why-ai-safety"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → Why AI Safety Matters
                  </a>
                  <a
                    href="#how-models-fooled"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → How Models Can Be &quot;Fooled&quot;
                  </a>
                  <a
                    href="#mistakes-without-attackers"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → Mistakes Without Attackers
                  </a>
                  <a
                    href="#llms-role"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → Where LLMs Come Into Play
                  </a>
                  <a
                    href="#your-role"
                    className="block hover:bg-gray-100 p-2 transition"
                    onClick={() => setShowTOC(false)}
                  >
                    → Where You Come Into Play
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
                Why Computer Vision Safety Matters
              </h1>
              <p className="text-sm text-gray-600">
                By Ethan Pineda • 8 min read
              </p>
            </div>
            <div
              id="introduction"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <p className="leading-relaxed mb-4">
                In a previous article, we discussed in-depth the foundations of
                computer vision by looking at two specific edge detection
                algorithms: Sobel and Canny. And to a newcomer to computer
                vision and computer science generally, these systems can feel
                like &quot;magic&quot;. Yet, these very systems and tools are
                nuanced, the main concern being they are not perfect, and can
                sometimes &quot;mis-see&quot; whenever an image is for example,
                noisy, intentionally manipulated, or simply unlike anything that
                their creators or even of the algorithm itself, has never seen
                before.
              </p>
              <p className="leading-relaxed">
                <strong>AI-safety research</strong> is a field in artificial
                intelligence that asks the simple question of:{" "}
                <em>
                  how do we stop these mistakes from potentially hurting people?
                </em>{" "}
                Below is a beginner&apos;s introduction to AI-safety research,
                and why it&apos;s important to think about.
              </p>
            </div>
            <div
              id="why-ai-safety"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">Why AI Safety Matters</h2>
              <p className="leading-relaxed mb-4">
                As we saw in this website, even small pixel-level errors can
                lead edge detection models to be less confident in what they are
                &quot;seeing&quot;. Even more complex tools and technologies,
                such as Tesla Autopilot crashes have found that rely almost
                entirely on just front cameras can sometimes cause the
                technology to miss obstacles, with unfortunately fatal outcomes
                <sup>[1]</sup>.
              </p>
              <p className="leading-relaxed">
                Likewise, bias in training datasets for more complex computer
                vision models can be just as harmful in more quiet settings. For
                example, a study done from MIT showed that commercial
                face-analysis APIs mis-identified dark-skinned women{" "}
                <strong>35 percent</strong> of the time, versus under 1 percent
                for light-skinned men, revealing a large difference of fairness
                that could lead to unjust policing or hiring decisions
                <sup>[2]</sup>.
              </p>
            </div>
            <div
              id="how-models-fooled"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                How Computer Vision Models Can be &quot;Fooled&quot;
              </h2>
              <p className="leading-relaxed mb-4">
                In 2014, researchers demonstrated that adding a few carefully
                chosen specks of noise could flip a neural network&apos;s answer
                with high confidence—coining the &quot;adversarial example&quot;
                problem<sup>[3]</sup>. Follow-up work showed the danger persists
                in the physical world: printed stickers, funky glasses, or even
                T-shirts can hide a pedestrian from a detector or make a stop
                sign read &quot;Speed Limit 45.&quot; A 2023 survey catalogues
                more than 100 such real-world attacks and explains why they
                remain hard to block: physical perturbations survive camera
                distance, angle, and lighting<sup>[4]</sup>.{" "}
                <strong>
                  <em>
                    This article was actually the inspiration for this project!
                  </em>
                </strong>
              </p>
              <p className="leading-relaxed">
                For lower-level filters such as Sobel and Canny, the edge
                finding tools that you learned from this website aren&apos;t
                free from being targets either. As we saw in the simulation lab,
                by adding in pixel perturbation, edge blurs, and many other
                changes to the input images, an attack can erase real edges or
                create &quot;phantom edges&quot; thereby confusing every later
                step that expects these outputs to be as clean as possible
                <sup>[4]</sup>.
              </p>
            </div>
            <div
              id="mistakes-without-attackers"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                Even Without Attackers, Mistakes can Happen
              </h2>
              <p className="leading-relaxed mb-4">
                Even in a perfect world without people trying to serve as bad
                actors, everyday life is so complex that it can easily catch the
                vulnerabilities in computer vision systems. Ultimately, things
                such as heavy rain, fog, glare can drop state of the art object
                detection systems by the double digits which is why researchers
                in the computer vision space, are relying more on real world
                testing<sup>[4]</sup> to verify the robustness of their models
                and systems.
              </p>
              <p className="leading-relaxed">
                As we saw earlier, it&apos;s important to call out that
                demographic shift is another form of distribution shift because
                if the dataset skews toward light faces, darker complexions
                become &quot;out-of-distribution,&quot; leading to the fairness
                gaps documented by MIT<sup>[2]</sup>.
              </p>
            </div>
            <div
              id="llms-role"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                Where Large-Language Models Come Into Play
              </h2>
              <p className="leading-relaxed mb-4">
                Large Language Models (LLMs) like ChatGPT, Claude, and Google
                Gemini are capable of &quot;learning&quot; to <em>see</em> as
                well as chat with you with a picture that you uploaded for
                example. OpenAI&apos;s GPT-4o can accept images alongside text
                and reason about both in real time, promising assistants that
                read charts or describe photos<sup>[5]</sup>.
              </p>
              <p className="leading-relaxed mb-4">
                However, connecting computer vision to natural language brings
                more risks into place. For example, a malicious actor could
                create a series of photos/images that output misinformation,
                maybe they create billions of images that claim that the moon
                landing was in fact, not real or leak/dox private information of
                real people. While there are some safeguards for this technology
                <sup>[5]</sup>, we still don&apos;t know how <em>good</em> they
                are because there&apos;s so much to consider and what we are
                only able to see what OpenAI for example, want us to believe in
                what they&apos;re doing.
              </p>
              <p className="leading-relaxed">
                So, there&apos;s a lot more unknown than you may think! This is
                all a very much <strong>blackbox</strong> problem.
              </p>
            </div>
            <div
              id="your-role"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                Where You Come Into Play
              </h2>
              <p className="leading-relaxed mb-4">
                As someone who is now entering the field and study of computer
                science, the fastest way to get a hand in these issues and
                technologies is to tinker and experiment with them (in the same
                way that I did for this project). Recreate popular technologies
                (like Sobel and Canny) on your own from scratch, write a few
                lines in Python to create Goodfellow&apos;s adversarial noise,
                try randomly flipping pixels in an image. Or even feed an
                altered picture to GPT-4o&apos;s vision mode and note how its
                explanation changes.
              </p>
              <p className="leading-relaxed mb-4">
                And of course, stay in the loop and read real incident reports
                from Tesla autopilot crashes, bias audits, red-team findings to
                see where the latest faults are coming from.
              </p>
              <p className="leading-relaxed">
                To say all this, Computer Vision is spreading very rapidly into
                our daily lives from personal dog robots to AR glasses. Making
                these technologies safe is less about making the code that
                builds them &quot;perfect&quot; and more so about expecting the
                unexpected: weird weather, stickers on objects, biased training
                datasets, and now the big question: multimodal models. If you
                learn these patterns and technologies early, you&apos;ll be
                ready to design tools that can <em>see</em> the world and treat
                it with respect.
              </p>
            </div>
            <div
              id="works-cited"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">Works Cited</h2>
              <div className="space-y-2 text-sm">
                <p>
                  [1] Car and Driver. &quot;Tesla Autopilot Crashes Linked to
                  Overreliance on Computer Vision.&quot;{" "}
                  <Link
                    href="https://www.caranddriver.com/news/a61743211/tesla-autopilot-crashes-investigation/"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://www.caranddriver.com/news/a61743211/tesla-autopilot-crashes-investigation/
                  </Link>
                </p>

                <p>
                  [2] MIT News. &quot;Study finds gender and skin-type bias in
                  commercial artificial intelligence systems.&quot;{" "}
                  <Link
                    href="https://news.mit.edu/2018/study-finds-gender-skin-type-bias-artificial-intelligence-systems-0212"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://news.mit.edu/2018/study-finds-gender-skin-type-bias-artificial-intelligence-systems-0212
                  </Link>
                </p>

                <p>
                  [3] arXiv. &quot;Explaining and Harnessing Adversarial
                  Examples.&quot;{" "}
                  <Link
                    href="https://arxiv.org/abs/1412.6572"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://arxiv.org/abs/1412.6572
                  </Link>
                </p>

                <p>
                  [4] arXiv. &quot;Adversarial Examples in the Physical World: A
                  Survey.&quot;{" "}
                  <Link
                    href="https://arxiv.org/abs/2311.01473"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://arxiv.org/abs/2311.01473
                  </Link>
                </p>

                <p>
                  [5] OpenAI. &quot;Hello GPT-4o.&quot;{" "}
                  <Link
                    href="https://openai.com/index/hello-gpt-4o/"
                    target="_blank"
                    className="underline text-blue-800"
                  >
                    https://openai.com/index/hello-gpt-4o/
                  </Link>
                </p>
              </div>
            </div>
            <div className="bg-white border border-black p-6 w-full shadow-lg text-center">
              <Link
                href="/about"
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
