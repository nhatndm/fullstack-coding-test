import { useMemo, memo } from "react";
import { Formik, Field, Form, FormikProps, FormikHelpers } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

import * as yup from "yup";
import "draft-js/dist/Draft.css";

// INTERFACE
import { Blog } from "model/Blog";

interface IProps {
  blog: Blog;
  onSubmit: (blog: Blog, formilHelper: FormikHelpers<Blog>) => void;
  onReset: () => void;
}

const Editor = dynamic(
  () => {
    return import("components/Editor");
  },
  { ssr: false }
);

const BlogForm = ({ blog, onSubmit, onReset }: IProps) => {
  const initalValue: Blog = useMemo(() => {
    return {
      id: blog.id,
      pid: blog.pid,
      title: blog.title,
      img_url: blog.img_url,
      content: blog.content,
    };
  }, [blog]);

  const validationSchema = useMemo(
    () =>
      yup.object<Omit<Blog, "id">>({
        title: yup.string().required("Email is required"),
        content: yup.string().required("Content is required"),
        img_url: yup.string().required("Img_Url is required"),
      }),
    []
  );

  const handleReset = (form: FormikHelpers<Blog>) => {
    if (initalValue.id) {
      return onReset();
    }

    return form.resetForm();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initalValue}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ touched, errors, isSubmitting }: FormikProps<Blog>) => (
        <Form>
          <Stack spacing={5}>
            <Heading as="h3">Blog Form</Heading>
            <Field name="title">
              {({ field }) => (
                <FormControl isInvalid={errors.title && touched.title}>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} placeholder="Title" />
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="img_url">
              {({ field }) => (
                <FormControl isInvalid={errors.img_url && touched.img_url}>
                  <FormLabel>Img Url</FormLabel>
                  <Input {...field} placeholder="Img Url" />
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="content">
              {({ field, form }) => {
                return (
                  <FormControl isInvalid={errors.content && touched.content}>
                    <FormLabel>Content</FormLabel>
                    <Editor
                      {...field}
                      onChange={(v) => form.setFieldValue("content", v)}
                    />
                    <FormErrorMessage>{errors.content}</FormErrorMessage>
                  </FormControl>
                );
              }}
            </Field>

            <div>
              <Button
                width="100px"
                colorScheme="teal"
                // onClick={() => handleSubmit(form.values, form)}
                type="submit"
                isLoading={isSubmitting}
              >
                {initalValue.id ? "Save" : "Create"}
              </Button>

              <Field>
                {({ form }) => (
                  <Button
                    width="100px"
                    colorScheme="gray"
                    ml={5}
                    onClick={() => handleReset(form)}
                    type="button"
                  >
                    Reset
                  </Button>
                )}
              </Field>
            </div>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default memo(BlogForm);
