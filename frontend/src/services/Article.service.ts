import requestUrls from "../common/urls";
import { http } from "./connections";

export const fetchArticles = (page: number, userId: string) => {
  const userIdQuery = userId ? `userId=${userId}` : "";

  return http
    .get(`${requestUrls.article}?page=${page}&${userIdQuery}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    });
};

export const createArticle = (title: string, description: string) => {
  return http
    .post(requestUrls.article, {
      title,
      description,
    })
    .then((response) => {
      if (response.status !== 201) {
        throw response;
      }

      return response.data;
    });
};

export const deleteArticle = (articleId: string) => {
  return http.delete(`${requestUrls.article}/${articleId}`);
};
