import React from "react";
import { useDispatch } from "react-redux";
import uuidv4 from "uuid/v4";
import { addImage } from "../../store/images/actions";
import classes from "../../utils/classes";
import "./FileUpload.scss";

const bem = classes("file-upload");

const FileUpload: React.FC = () => {
  const dispatch = useDispatch();

  const fileChangedHandler = (event: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    let fileName = event.target.files[0].name;
    reader.onloadend = () => {
      let ReaderBase64 = reader.result as string;
      if (reader.result) {
        let image = {
          FileName: fileName,
          Base64: ReaderBase64,
          UID: uuidv4()
        };
        dispatch(addImage(image));
      }
    };
  };

  return (
    <section className={bem()}>
      <input
        type="file"
        accept=".png,.jpg"
        onChange={fileChangedHandler}
        className={bem("input")}
      />
    </section>
  );
};

export default FileUpload;
