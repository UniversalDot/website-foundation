import { Link, useParams, Navigate } from "react-router-dom";
import { getBlogPost } from "../constants/blogs";
import MapfArticleContent from "../components/blog/MapfArticleContent";
import ImplicitDehazingArticleContent from "../components/blog/ImplicitDehazingArticleContent";

const ARTICLE_CONTENT = {
  "mapf-multi-agent-path-finding": MapfArticleContent,
  "implicit-dehazing-feature-space": ImplicitDehazingArticleContent,
};

const BlogArticlePage = () => {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const ContentComponent = ARTICLE_CONTENT[slug];

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[740px] items-center px-6 py-4">
          <Link
            to="/#blog"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            ← Back to portfolio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[740px] px-6 py-12 md:py-16">
        <article>
          <header className="mb-10">
            <h1 className="font-['Source_Serif_4',Georgia,serif] text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
              {post.subtitle || post.title}
            </h1>

            {post.subtitle && (
              <p className="mt-4 font-['Source_Serif_4',Georgia,serif] text-xl text-gray-600">{post.title}</p>
            )}

            <div className="mt-8 flex items-center gap-3 border-b border-gray-200 pb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-apple-blue text-sm font-semibold text-white">
                SS
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">UNIVERSALDOT</p>
                {post.tags && (
                  <p className="text-sm text-gray-500">{post.tags}</p>
                )}
              </div>
            </div>
          </header>

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="mb-10 w-full rounded-sm object-cover"
            />
          )}

          {ContentComponent ? (
            <ContentComponent />
          ) : (
            <div className="py-8" />
          )}
        </article>
      </main>
    </div>
  );
};

export default BlogArticlePage;
