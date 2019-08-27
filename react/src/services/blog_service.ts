import Blog from "../models/blog";
import API from "@aws-amplify/api";

const apiName: string = "blogs";
const apiPath: string = "/blogs";

export const getAllBlogs = async () => {
  return API.get(apiName, apiPath, {});
};

export const getBlog = async (id: string) => {
  return API.get(apiName, `${apiPath}/${id}`, {});
};

export const createBlog = async (blog: Blog) => {
  return API.post(apiName, apiPath, {
    body: blog
  });
};

export const updateBlog = async (blog: Blog) => {
  return API.put(apiName, `${apiPath}/${blog.blogId}`, {
    body: blog
  });
};

export const deleteBlog = async (id: string) => {
  return API.del(apiName, `${apiPath}/${id}`, {});
};