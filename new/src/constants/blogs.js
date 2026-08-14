import mapfImage from "../assets/mapf-blog.jpg";
import implicitDehazingImage from "../assets/implicit-dehazing.jpg";

export const BLOG_POSTS = [
  {
    slug: "implicit-dehazing-feature-space",
    title: "Implicit Dehazing in Feature Space for Autonomous Vehicle Perception",
    subtitle: "",
    tags: "Research · Autonomous Vehicles · Computer Vision",
    excerpt: "",
    coverImage: implicitDehazingImage,
  },
  {
    slug: "mapf-multi-agent-path-finding",
    title: "MAPF – Multi-Agent Path Finding",
    subtitle:
      "Navigating the Grid: How Multi-Agent Path Finding (MAPF) Powers Warehouse Robots",
    tags: "Multi-Agent Path Finding · Robotics · Algorithms",
    excerpt:
      "A walkthrough of how hundreds of warehouse robots share the same grid without colliding, and the algorithms that make it possible in real time.",
    coverImage: mapfImage,
  },
];

export const getBlogPost = (slug) =>
  BLOG_POSTS.find((post) => post.slug === slug);
