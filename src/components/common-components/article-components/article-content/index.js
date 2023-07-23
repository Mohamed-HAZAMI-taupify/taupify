import React from "react";
import TextEditor from "../../../common-components/input-toolbar";

export default function ArticleContent({
  redact,
  title,
  description,
  image,
  video,
}) {
  return (
    <>
      <section
        className={`article-content ${title == "" ? " first-content" : ""}`}
      >
        {/* <TextEditor /> */}
        <div className="text-container">
          {/* {title ? <h1>{title}</h1> : null}  */}{" "}
          {/* FOR DISPLAY  🎉 WE ONLY NEED CONDITION 🎉 */}
          {/* <p>{description}</p>  */}{" "}
          {/* FOR DISPLAY  🎉 WE ONLY NEED CONDITION 🎉 */}
        </div>
        {image ? (
          <div className="article-image">
            {/* <img src={image} /> */}
            {/* FOR DISPLAY  🎉 WE ONLY NEED CONDITION 🎉 */}
          </div>
        ) : null}

        {video ? (
          <div className="article-video">
            {/* <iframe frameBorder="0" allowFullScreen src={video} /> */}{" "}
            {/* FOR DISPLAY  🎉 WE ONLY NEED CONDITION 🎉 */}
          </div>
        ) : null}
      </section>
    </>
  );
}
