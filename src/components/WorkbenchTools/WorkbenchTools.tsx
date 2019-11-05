/* eslint-disable no-loop-func */
import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuidv4 from "uuid/v4";
import { CirclePicker } from "react-color";
import WorkbenchImage from "../WorkbenchImage/WorkbenchImage";
import classes from "../../utils/classes";
import { AppState } from "../../store/rootReducer";
import { Annotation } from "../../store/annotations/types";
import {
  addAnnotation,
  updateAnnotation
} from "../../store/annotations/actions";
import { Category } from "../../store/categories/types";
import { addCategory } from "../../store/categories/actions";
import "./WorkbenchTools.scss";

const bem = classes("workbench-tools");

interface MyProps {
  imageUID: string;
}

const WorkbenchTools: React.FC<MyProps> = ({ imageUID }) => {
  const dispatch = useDispatch();
  const [popupOpen, setPopupOpen] = useState(false);
  const [tempNewCategory, setTempNewCategory] = useState({
    name: "",
    color: ""
  } as Category);
  const [tempAnnotationCategoryUID, setTempAnnotationCategoryUID] = useState(
    ""
  );

  const annotations = useSelector((state: AppState) =>
    state.annotations.filter(annotation => annotation.imageUID === imageUID)
  );

  const categories = useSelector((state: AppState) => state.categories);
  const addNew = (type: string) => {
    let newAnnotation: Annotation = {
      type,
      UID: uuidv4(),
      imageUID
    };
    dispatch(addAnnotation(newAnnotation));
  };

  useEffect(() => {
    const makeAnnotationInteractive = (uid: string) => {
      const item = document.querySelector(`.${uid}`);

      if (item) {
        const annotation = annotations.filter(
          el => el.UID === uid.replace("uid-", "")
        )[0];

        const setInteractive = function(e) {
          const h = e.target.offsetHeight;
          const w = e.target.offsetWidth;
          const t = e.target.offsetTop;
          const l = e.target.offsetLeft;
          const y = parseInt(t + h) - e.pageY;
          const x = parseInt(l + w) - e.pageX;

          const drag = e => {
            if (!e.target.classList.contains(`${uid}`)) return;
            e.target.style.top = `${e.y + y - h}px`;
            e.target.style.left = `${e.x + x - w}px`;
          };

          const resize = e => {
            if (!e.target.classList.contains(`${uid}`)) return;
            e.target.style.width = `${e.pageX - l + x}px`;
            e.target.style.height = `${e.pageY - t + y}px`;
          };

          const removeResize = e => {
            let resizedAnnotation = {
              ...annotation,
              width: e.target.style.width,
              height: e.target.style.height
            };

            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", removeResize);
            dispatch(updateAnnotation(resizedAnnotation));
            e.preventDefault();
          };

          const removeDrag = e => {
            let movedAnnotation = {
              ...annotation,
              posY: e.target.style.top,
              posX: e.target.style.left
            };

            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", removeDrag);
            dispatch(updateAnnotation(movedAnnotation));
            e.preventDefault();
          };

          let elX =
            e.target.getBoundingClientRect().width +
            e.target.getBoundingClientRect()["x"];

          let elY =
            e.target.getBoundingClientRect().height +
            e.target.getBoundingClientRect()["y"];

          if (elX > e.x + 30 && elY > e.y + 30) {
            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", removeDrag);
            e.preventDefault();
          } else {
            document.addEventListener("mousemove", resize);
            document.addEventListener("mouseup", removeResize);
            e.preventDefault();
          }
        };

        item.addEventListener("mousedown", setInteractive);
      }
    };

    if (annotations.length) {
      annotations.map(annotation =>
        makeAnnotationInteractive(`uid-${annotation.UID}`)
      );
    }

    return () => {};
  }, [annotations, dispatch, imageUID]);

  const setCategory = (annotation: Annotation, categoryUID: string) => {
    dispatch(updateAnnotation({ ...annotation, categoryUID: categoryUID }));
  };

  const handleNewCategoryColorChange = (color: any) => {
    setTempNewCategory({ ...tempNewCategory, color: color.hex });
  };

  const handleNewCategoryNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTempNewCategory({ ...tempNewCategory, name: e.target.value });
  };

  const checkIfNewCategoryValid = () => {
    if (tempNewCategory.color.length && tempNewCategory.name.length) {
      return true;
    }
    return false;
  };

  const submitNewCategory = () => {
    const newCategoryUID = uuidv4();
    dispatch(addCategory({ ...tempNewCategory, UID: newCategoryUID }));
    let currentAnntation = annotations.filter(
      annotation => annotation.UID === tempAnnotationCategoryUID
    )[0];
    dispatch(
      updateAnnotation({ ...currentAnntation, categoryUID: newCategoryUID })
    );
    setPopupOpen(false);
  };

  return (
    <section className={bem()}>
      <WorkbenchImage imageUID={imageUID}>
        {annotations.map((annotation, i) => (
          <div
            key={annotation.UID}
            className={`uid-${annotation.UID} interactive`}
            style={{
              width: annotation.width || "10rem",
              height: annotation.height || "10rem",
              top: annotation.posY || "calc(50% - 2.5rem)",
              left: annotation.posX || "calc(50% - 5rem)",
              backgroundColor: annotation.categoryUID
                ? categories.filter(
                    cat => cat.UID === annotation.categoryUID
                  )[0].color
                : "transparent",
              borderRadius: `${annotation.type === "rectangle" ? "0" : "50%"}`
            }}
          >
            <span className={bem("annotation-hash")}>#{i + 1}</span>
          </div>
        ))}
      </WorkbenchImage>
      <div className={bem("container")}>
        <div className={bem("type-buttons")}>
          <button
            onClick={() => addNew("rectangle")}
            className={bem("add-button")}
          >
            add rectangle
          </button>
          <button
            onClick={() => addNew("ellipse")}
            className={bem("add-button")}
          >
            add ellipse
          </button>
        </div>
        <div className={bem("annotations-container")}>
          {annotations.length > 0 && (
            <h2 className={bem("annotations-title")}>annotations:</h2>
          )}
          {annotations.map((annotation, i) => (
            <div key={annotation.UID} className={bem("annotation-item")}>
              #{i + 1}
              <div className={bem("category-container")}>
                {annotation.categoryUID ? (
                  <span
                    style={{
                      color: "white",
                      backgroundColor: `${
                        categories.filter(
                          cat => cat.UID === annotation.categoryUID
                        )[0].color
                      }`,
                      padding: ".2rem .4rem"
                    }}
                  >
                    {
                      categories.filter(
                        cat => cat.UID === annotation.categoryUID
                      )[0].name
                    }
                  </span>
                ) : (
                  <>
                    <button
                      className={bem("new-category-button")}
                      onClick={() => {
                        setPopupOpen(true);
                        setTempAnnotationCategoryUID(annotation.UID);
                      }}
                    >
                      new category
                    </button>
                    {" or "}
                    <select
                      className={bem("category-select")}
                      required
                      defaultValue={"DEFAULT"}
                      onChange={e => setCategory(annotation, e.target.value)}
                    >
                      <option value="DEFAULT" disabled>
                        select existing
                      </option>
                      {categories.map(category => (
                        <option
                          value={category.UID}
                          key={category.UID}
                          style={{ backgroundColor: `${category.color}` }}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {popupOpen && (
          <div className={bem("popup-overlay")}>
            <div className={bem("popup")}>
              <h2 className={bem("popup-title")}>add new category</h2>
              <span
                className={bem("popup-close")}
                onClick={() => {
                  setPopupOpen(false);
                  setTempAnnotationCategoryUID("");
                }}
              >
                &times;
              </span>
              <div className={bem("popup-content")}>
                <span className={bem("popup-text")}>
                  select color and category name:
                </span>
                <CirclePicker
                  onChangeComplete={color =>
                    handleNewCategoryColorChange(color)
                  }
                />
                <input
                  className={bem("popup-name-input")}
                  type="text"
                  placeholder="category name"
                  onChange={e => handleNewCategoryNameChange(e)}
                ></input>
                <div className={bem("popup-category-preview")}>
                  {tempNewCategory.color.length > 0 && (
                    <span style={{ color: `${tempNewCategory.color}` }}>
                      {tempNewCategory.color}
                    </span>
                  )}
                  {tempNewCategory.name.length > 0 && (
                    <span>{tempNewCategory.name}</span>
                  )}
                </div>
                <button
                  className={bem("popup-submit-button")}
                  onClick={submitNewCategory}
                  disabled={!checkIfNewCategoryValid()}
                >
                  add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkbenchTools;
