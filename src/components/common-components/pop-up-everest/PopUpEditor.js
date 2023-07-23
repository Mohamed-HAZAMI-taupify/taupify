import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const PopUpEditor = ({
  value,
  type,
  handleBeforeAddUndo,
  onInit,
  onEditorChange,
  sizeLimit,
  length,
}) => {
  return (
    <div className="editor-container">
      <Editor
        apiKey="q0qka6t4ve1tebzyc5scuhvhcr9dmlw8yqrsekba9y7vl3sa"
        value={value}
        onEditorChange={onEditorChange}
        //onBeforeAddUndo:gére le dépassement du nombre max des lettres
        onBeforeAddUndo={handleBeforeAddUndo}
        onInit={onInit}
        init={{
          height: 150,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount textcolor",
          ],
          toolbar:
            "undo redo | fontselect | fontsizeselect |" +
            "bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify" +
            " bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Poppins, sans-serif; font-size:14px }",
          fontsize_formats:
            "8pt 10pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 28pt 30pt 32pt 34pt 36pt 38pt 40pt 42pt 44pt 46pt 48pt 50pt",
          toolbar_mode: "scrolling",
        }}
      />
      <div className="editor-footer">
        <span className="">{type}</span>
        <span className="limit-characters">
          {sizeLimit - length}/{sizeLimit}
        </span>
      </div>
    </div>
  );
};
export default PopUpEditor;
