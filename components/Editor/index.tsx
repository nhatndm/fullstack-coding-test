import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}

const Editor = ({ onChange, value, onBlur }: IProps) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      onBlur={(event, editor) => {
        const data = editor.getData();
        onBlur(data);
      }}
    />
  );
};

export default Editor;
