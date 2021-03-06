import { useEffect, useState } from "react";
import { Heading, Flex, Stack } from "@chakra-ui/react";
import { FormikHelpers } from "formik";

// COMPONENT
import BlogTable from "components/BlogsTable";
import BlogForm from "./module/form";
import ConfirmationModal from "components/ConfirmationModal";

// HOOK
import { withAuthenticatedAdmin } from "hooks/withAuthenticatedAdmin";

// AXIOS
import { callApi } from "config/axios";

// CONSTANT
import APP_ENV from "constant";

// MODEL
import { Blog } from "model/Blog";

interface IState {
  blogs: Blog[];
  blog: Blog;
  showConfirmation: boolean;
}

const DashboardComponent = (props) => {
  const [localState, setLocalState] = useState<IState>({
    blogs: [],
    blog: {
      id: "",
      title: "",
      content: "",
      img_url: "",
      pid: 0,
    },
    showConfirmation: false,
  });

  useEffect(() => {
    getAllBlog();
  }, []);

  const getAllBlog = async () => {
    const response = await callApi<Blog[]>({
      method: "GET",
      token: props.user.accessToken,
      url: APP_ENV.URL.POST.GET_POST,
    });

    if (response) {
      setLocalState({
        ...localState,
        blogs: response.data,
        blog: {
          id: "",
          title: "",
          content: "",
          img_url: "",
          pid: 0,
        },
        showConfirmation: false,
      });
    }
  };

  const handleItemClick = (blogItem: Blog, action: "edit" | "delete") => {
    if (action === "edit") {
      return setLocalState({
        ...localState,
        blog: blogItem,
      });
    }

    return setLocalState({
      ...localState,
      blog: blogItem,
      showConfirmation: true,
    });
  };

  const handleSubmit = async (
    blog: Blog,
    formilHelper: FormikHelpers<Blog>
  ) => {
    formilHelper.setSubmitting(true);

    if (!blog.id) {
      const response = await callApi<Blog>({
        method: "POST",
        url: `${APP_ENV.APP.API}/${APP_ENV.URL.POST.MAIN_ROUTE}`,
        token: props.user.accessToken,
        data: {
          content: blog.content,
          title: blog.title,
          img_url: blog.img_url,
        },
      });

      const newBlog = response.data;

      const newArr = localState.blogs.concat([
        {
          ...newBlog,
          pid: Number(newBlog.id),
        },
      ]);

      setLocalState({ ...localState, blogs: newArr });

      formilHelper.setSubmitting(false);

      formilHelper.resetForm();
    }

    if (blog.id) {
      const response = await callApi<Blog>({
        method: "PUT",
        url: `${APP_ENV.APP.API}/${APP_ENV.URL.POST.MAIN_ROUTE}/${Number(
          blog.pid
        )}`,
        token: props.user.accessToken,
        data: {
          content: blog.content,
          title: blog.title,
          img_url: blog.img_url,
        },
      });

      const updatedBlog = response.data;

      const newArray = localState.blogs.map((v) => {
        if (v.pid === Number(updatedBlog.id)) {
          return { ...updatedBlog, pid: Number(v.id) };
        }

        return v;
      });

      setLocalState({
        ...localState,
        blogs: newArray,
        blog: {
          id: "",
          title: "",
          content: "",
          img_url: "",
          pid: 0,
        },
      });

      formilHelper.setSubmitting(false);
    }
  };

  const handleReset = () => {
    setLocalState({
      ...localState,
      blog: {
        id: "",
        content: "",
        title: "",
        img_url: "",
      },
    });
  };

  const changeModalStatus = () => {
    setLocalState({
      ...localState,
      showConfirmation: !localState.showConfirmation,
      blog: {
        id: "",
        title: "",
        content: "",
        img_url: "",
        pid: 0,
      },
    });
  };

  const onConfirmModal = async () => {
    await callApi({
      method: "DELETE",
      url: `${APP_ENV.APP.API}/${APP_ENV.URL.POST.MAIN_ROUTE}/${Number(
        localState.blog.pid
      )}`,
      token: props.user.accessToken,
    });

    const cloneArray = localState.blogs.filter(
      (v) => v.pid !== localState.blog.pid
    );

    setLocalState({
      blogs: cloneArray,
      blog: {
        id: "",
        title: "",
        content: "",
        img_url: "",
        pid: 0,
      },
      showConfirmation: false,
    });
  };

  const onCancelModal = async () => {
    setLocalState({
      ...localState,
      blog: {
        id: "",
        title: "",
        content: "",
        img_url: "",
        pid: 0,
      },
      showConfirmation: false,
    });
  };

  return (
    <Flex flexDirection="column" p={10} paddingTop="100px">
      <Stack spacing={10}>
        <BlogForm
          blog={localState.blog}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />

        <Heading as="h3">Blog</Heading>

        <BlogTable blogs={localState.blogs} onItemClick={handleItemClick} />

        <ConfirmationModal
          blog={localState.blog}
          modalStatus={localState.showConfirmation}
          setModalStatus={changeModalStatus}
          onConfirm={onConfirmModal}
          onCancel={onCancelModal}
        />
      </Stack>
    </Flex>
  );
};

export default withAuthenticatedAdmin(DashboardComponent);
