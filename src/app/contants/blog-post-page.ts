interface Author {
  name: string;
  image: string;
  linkedIn: string;
}

interface BlogPostsPage {
  id: string;
  title: string;
  description: string;
  authors: Author[];
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPostsPage[] = [
  {
    id: "what-is-computer-vision",
    title: "What is Computer Vision?",
    description:
      "Understanding edge detection algorithms like Sobel and Canny - the foundation of computer vision and how computers trace outlines of what they see",
    authors: [
      {
        name: "Ethan Pineda",
        image: "/blog/authors/ethan.jpeg",
        linkedIn: "https://www.linkedin.com/in/ethanpineda/",
      },
    ],
    readTime: "12 min read",
    tags: ["Computer Vision", "Edge Detection", "Algorithms", "Guide"],
  },
  {
    id: "computer-vision-safety",
    title: "Why Computer Vision Safety Matters",
    description:
      "An exploration of AI safety research in computer vision, from adversarial attacks to bias in datasets, and why these systems can sometimes 'mis-see' with serious consequences",
    authors: [
      {
        name: "Ethan Pineda",
        image: "/blog/authors/ethan.jpeg",
        linkedIn: "https://www.linkedin.com/in/ethanpineda/",
      },
    ],
    readTime: "8 min read",
    tags: ["AI Safety", "Computer Vision", "Ethics", "Security"],
  },
  {
    id: "technical-deep-dive-edge-detection",
    title: "A Technical Deep Dive Into This Project",
    description:
      "Step-by-step explanation of how the edge detection dataset was generated, from building ground truth to designing attacks that target specific stages of computer vision algorithms",
    authors: [
      {
        name: "Ethan Pineda",
        image: "/blog/authors/ethan.jpeg",
        linkedIn: "https://www.linkedin.com/in/ethanpineda/",
      },
    ],
    readTime: "10 min read",
    tags: ["Technical", "Computer Vision", "Implementation", "Research"],
  },
];
