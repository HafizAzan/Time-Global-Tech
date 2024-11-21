"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addPosts,
  deletePosts,
  editPosts,
  getPosts,
  getPostsById,
} from "../services/Post.Service";

const usePosts = () => {
  const {
    data: getPostData,
    isFetching: getPostLoader,
    refetch: refetchData,
  } = useQuery({
    queryKey: ["getPostsData"],
    queryFn: getPosts,
  });

  const {
    mutateAsync: addPostDataId,
    isFetching: getPostLoaderId,
    data: getPostById,
  } = useMutation({
    mutationKey: ["GetPostsDataId"],
    mutationFn: (id) => getPostsById(id),
  });

  const { mutateAsync: addPostData, isFetching: addPostLoader } = useMutation({
    mutationKey: ["addPostsData"],
    mutationFn: (data) => addPosts(data),
  });

  const { mutateAsync: editPostData, isFetching: editPostLoader } = useMutation(
    {
      mutationKey: ["editPostsData"],
      mutationFn: ({ data, id }) => editPosts(data, id),
    }
  );

  const { mutateAsync: deletePostData, isFetching: deletePostLoader } =
    useMutation({
      mutationKey: ["editPostsData"],
      mutationFn: (id) => deletePosts(id),
    });

  return {
    getPostData,
    getPostLoader,
    addPostData,
    addPostLoader,
    editPostData,
    editPostLoader,
    refetchData,
    addPostDataId,
    getPostById,
    getPostLoaderId,
    deletePostData,
    deletePostLoader,
  };
};

export default usePosts;
