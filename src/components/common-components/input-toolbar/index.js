
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import { editorCurrent } from "../../../redux/actions/JournalActions";

const TextEditor = (props) => {
  const editorRef = useRef(null);

  const onChange = (e) => {
    // editorRef.current.getContent() : nous donne le contenu du text ajouté par l'éditeur tinymce/tinymce-react 
    // props.editorCurrent : l'action qui change le state editorValue
     props.editorCurrent(editorRef.current.getContent());
  };

  return (
    <div className="section-editor">
      <Editor
        initialValue={props.value}
        apiKey="q0qka6t4ve1tebzyc5scuhvhcr9dmlw8yqrsekba9y7vl3sa"
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Poppins, sans-serif; font-size:14px }",
      
            bold: [
              { inline: 'strong', remove: 'all' },
              { inline: 'span', styles: { fontWeight: 'bold' } },
              { inline: 'b', remove: 'all' }
            ],
          }}

      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  editorCurrent: (article) => {
    dispatch(editorCurrent(article));
  },
});
const mapStateToProps = (state) => {
  return {
    journalReducer: state.JournalReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);