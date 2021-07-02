import { Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { showNotification } from "../../common/helpers";
import CreateArticleModal from "../../components/CreateArticleModal";
import { deleteArticle, fetchArticles } from "../../services/Article.service";
import { isAuthenticated, logout } from "../../services/Auth.service";
import ArticleView, { IArticle } from "./Article.view";

const Article = () => {
  const [showModal, setShowModal] = useState(false);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const getArticles = async (page = 1, userId = "") => {
    setLoading(true);
    try {
      const data = await fetchArticles(page, userId);
      setArticles(data.articles);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleDeleteArticle = async (title: string, articleId: string) => {
    if (!window.confirm(`Delete "${title}" article?`)) {
      return;
    }

    try {
      await deleteArticle(articleId);
      getArticles(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  const userLogout = () => {
    logout();
    history.push("/");
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      showNotification("Please login first", "info");
      history.push("/");
      return;
    }
    getArticles();
  }, []);

  const userFilteredList = useMemo(() => {
    const uniqueUsers: any = {};

    return articles
      .map(({ user }) => ({
        text: user.name,
        value: user._id,
      }))
      .reduce((prev: any[], current) => {
        if (!uniqueUsers[current.value]) {
          uniqueUsers[current.value] = true;
          prev.push(current)
        }
        return prev;
      }, []);
  }, [articles]);

  const tableColumns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Published By",
      dataIndex: "user",
      filters: userFilteredList,
      onFilter: (userId: string, record: IArticle) => {
        return userId === record.user._id;
      },
      render: (value: IArticle["user"]) => {
        return value.name;
      },
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: (value: IArticle) => (
        <Space size="middle">
          <a onClick={() => handleDeleteArticle(value.title, value._id)}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CreateArticleModal
        showModal={showModal}
        hideModal={() => setShowModal(false)}
        getAllArticles={() => {
          setShowModal(false);
          getArticles(currentPage);
        }}
      />
      <ArticleView
        articles={articles}
        setShowModal={setShowModal}
        tableColumns={tableColumns}
        loading={loading}
        userLogout={userLogout}
      />
    </>
  );
};

export default Article;
