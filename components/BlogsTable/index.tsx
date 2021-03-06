import { memo } from "react";
import { Table, Thead, Th, Tr, Tbody, Td, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

// MODEL
import { Blog } from "model/Blog";

interface IProps {
  no?: number;
  blogs?: Blog[];
  blog?: Blog;
  onItemClick: (blog: Blog, action: "edit" | "delete") => void;
}

const BlogRow = memo(({ blog, onItemClick, no }: IProps) => {
  const handleEditClick = () => {
    return onItemClick(blog, "edit");
  };

  const handleDeleteClick = () => {
    return onItemClick(blog, "delete");
  };

  return (
    <Tr>
      <Td w={50}>{no}</Td>
      <Td>{blog.title}</Td>
      <Td textAlign="end">
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Edit"
          icon={<EditIcon />}
          onClick={handleEditClick}
          mr={2}
        />
        <IconButton
          variant="outline"
          colorScheme="orange"
          aria-label="Delete"
          icon={<DeleteIcon />}
          onClick={handleDeleteClick}
        />
      </Td>
    </Tr>
  );
});

const BlogTable = ({ blogs, onItemClick }: IProps) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th w={50}>No</Th>
          <Th>Title</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {blogs.map((v, i) => {
          return (
            <BlogRow no={i} key={v.id} blog={v} onItemClick={onItemClick} />
          );
        })}
      </Tbody>
    </Table>
  );
};

export default memo(BlogTable);
