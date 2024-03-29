import React, { useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrentUserContext from "../../contexts/userContext";
import ReturnPageButton from "./ReturnPageButton";
import Navbar from "./Navbar";

function Upload() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const uploadToast = () =>
    toast.success("Upload réussi !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const uploadFailedToast = () =>
    toast.error("Upload échoué !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const uploadNoFileToast = () =>
    toast.warn("Pas de fichiers à Uploader !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const { token } = useContext(CurrentUserContext);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState([0]);
  const [categoryList, setCategoryList] = useState([]);
  const [promote, setPromote] = useState(1);
  const videoRef = useRef(null);
  const imgRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoRef.current.files[0] && imgRef.current.files[0]) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const formData = new FormData();
      formData.append("video", videoRef.current.files[0]);
      formData.append("img", imgRef.current.files[0]);
      formData.append("description", description);
      formData.append("name", name);
      formData.append("promote", promote);
      formData.append("category_id", categoryId);

      for (const [key, value] of formData.entries()) {
        console.warn(`${key}: ${value}`);
      }

      axios
        .post(`${BACKEND_URL}/api/videos`, formData, config)
        .then(() => {
          uploadToast();
        })
        .catch((error) => {
          console.error(error);
          uploadFailedToast();
        });
    } else {
      uploadNoFileToast();
    }
    setName("");
    setDescription("");
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/category`)
      .then((res) => setCategoryList(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <div className="upload-container">
        <ReturnPageButton />
        <h2>
          <strong> Upload De Vidéo</strong>
        </h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group file-area">
            <label htmlFor="video" className="form-label">
              Vidéo
            </label>
            <input type="file" ref={videoRef} id="video" required="required" />
            <div className="file-dummy">
              <div className="success">
                Votre fichier a bien été sélectionnée
              </div>
              <div className="default">Sélectionner une vidéo</div>
            </div>
          </div>
          <div className="form-group file-area">
            <label htmlFor="img" className="form-label">
              Image
            </label>
            <input type="file" ref={imgRef} id="img" required="required" />
            <div className="file-dummy">
              <div className="success">
                Votre fichier a bien été sélectionnée
              </div>
              <div className="default">Sélectionner une image</div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom de la vidéo
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              className="form-controll"
              required="required"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Categorie de la vidéo
            </label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              id="category"
              className="form-controll "
              required="required"
            >
              <option>---------Selectionnez une catégorie----------</option>
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="form-controll "
              required="required"
            />
          </div>
          <div className="form-group">
            <label htmlFor="promote" className="form-label">
              Mettre en avant
            </label>
            <select
              onChange={(e) => setPromote(e.target.value)}
              id="promote"
              className="form-controll "
              required="required"
            >
              <option value={1}>Oui</option>
              <option value={0}>Non</option>
            </select>
          </div>
          <div className="form-group">
            <button className="containerbtn" type="submit">
              Télécharger
            </button>
          </div>
        </form>
        <Navbar />
      </div>
      <ToastContainer />
    </>
  );
}

export default Upload;
