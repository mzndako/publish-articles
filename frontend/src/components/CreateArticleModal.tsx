import Modal from "antd/lib/modal/Modal";
import React, { ReactElement, useEffect, useState } from "react";
import { showNotification } from "../common/helpers";
import { createArticle } from "../services/Article.service";

interface IValue {
  title: string;
  description: string;
}

interface CreateArticleModalProps {
  showModal: boolean;
  hideModal: Function;
  getAllArticles: Function;
}

const defaultValues = {
  title: "",
  description: "",
};

const CreateArticleModal = ({
  showModal,
  hideModal,
  getAllArticles,
}: CreateArticleModalProps): ReactElement => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [values, setValues] = useState<IValue>(defaultValues);

  // Reset form values when display status is changed
  useEffect(() => {
    setValues(defaultValues);
  }, [showModal]);

  const handleOk = async () => {
    setConfirmLoading(true);
  
    try {
      await createArticle(values.title, values.description);
      showNotification("Article created successfully", "success");
      // Re-fetch articles
      getAllArticles();
    } catch (error) {
      showNotification("Error creating article", "error");
    }

    setConfirmLoading(false);
  };

  const handleInputChange = ({
    target,
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <>
      <Modal
        title="Create Article"
        visible={showModal}
        onOk={handleOk}
        okText="Publish"
        confirmLoading={confirmLoading}
        onCancel={() => hideModal()}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Title</label>
          <input
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
          <br />

          <label>Description</label>
          <textarea value={values.description} name="description" onChange={handleInputChange}></textarea>
        </div>
      </Modal>
    </>
  );
};

export default CreateArticleModal;
