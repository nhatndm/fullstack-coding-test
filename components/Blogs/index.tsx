import { memo } from "react";

// MODEL
import { Blog } from "model/Blog";

// COMPONENT
import BlogCard from "components/BlogCard";

interface IProps {
  blogs: Blog[];
  onItemClick: (blog: Blog) => void;
}

const Blogs = ({ blogs, onItemClick }: IProps) => {
  return (
    <>
      {blogs.map((v) => {
        return <BlogCard key={v.id} blog={v} onClick={onItemClick} />;
      })}
    </>
  );
};

export default memo(Blogs);
