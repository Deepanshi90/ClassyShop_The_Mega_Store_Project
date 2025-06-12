import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoMdTime } from "react-icons/io";
import { fetchDataFromApi } from '../../utils/api';
import BlogItem from '../../components/BlogItem';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    fetchDataFromApi(`/api/blog/${id}`).then((res) => {
      const currentBlog = res.blog || res;
      setBlog(currentBlog);

      fetchDataFromApi(`/api/blog/`).then((res) => {
        const allBlogs = res.blogs || res;
        const filtered = allBlogs.filter((b) => b._id !== currentBlog._id);
        setRelatedBlogs(filtered);
      });
    });
  }, [id]);

  if (!blog) return <p className="text-center py-10">Loading blog...</p>;

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Header Image */}
        <div className="relative mb-6">
          <img
            src={blog.images?.[0]}
            alt={blog.title}
            className="w-full max-h-[500px] object-cover rounded-lg shadow-md"
          />
          <span className="absolute bottom-4 right-4 bg-[#ff5252] text-white text-sm px-3 py-1 rounded flex items-center gap-1 shadow-lg">
            <IoMdTime className="text-base" />
            {blog.createdAt?.split("T")[0]}
          </span>
        </div>

        {/* Blog Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

        {/* Blog Description */}
        <div
          className="text-base md:text-lg text-gray-800 leading-8 mb-12"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Related Blogs Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Blogs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedBlogs.length > 0 ? (
              relatedBlogs.map((item) => (
                <BlogItem key={item._id} item={item} />
              ))
            ) : (
              <p className="text-gray-600">No related blogs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
