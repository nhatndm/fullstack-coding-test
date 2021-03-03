import { useCallback } from "react";
import { Box, Image, Text } from "@chakra-ui/react";

// MODEL
import { Blog } from "model/Blog";

interface IProps {
  blog: Blog;
  onClick: (blog: Blog) => void;
}

const BlogCard = ({ blog, onClick }: IProps) => {
  const handleClick = useCallback(() => {
    return onClick(blog);
  }, [blog]);

  return (
    <Box
      p={4}
      display="flex"
      flexDirection={["column", "column", "row", "row"]}
      alignItems={["", "", "center", "center"]}
      border="1px solid #ccc"
      borderRadius={5}
      onClick={handleClick}
    >
      <Box flexShrink={0}>
        <Image borderRadius="lg" width={40} src={blog.img_url} alt="" />
      </Box>
      <Box ml={{ md: 6, xl: 6 }}>
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="sm"
          letterSpacing="wide"
          color="teal.600"
          mt={[6, 6, 0, 0]}
        >
          {blog.title}
        </Text>
        <Text maxWidth={250} mt={2} color="gray.500" isTruncated>
          {blog.content}
        </Text>
      </Box>
    </Box>
  );
};

export default BlogCard;
