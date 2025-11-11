import React, { useState, useRef } from "react";
import Icon from "./Icon";
import "./TextEditor.css";

export default function TextEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
}) {
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    orderedList: false,
    unorderedList: false,
  });
  const editorRef = useRef(null);
  const isInternalChange = useRef(false);

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      orderedList: document.queryCommandState("insertOrderedList"),
      unorderedList: document.queryCommandState("insertUnorderedList"),
    });
  };

  const execCommand = (command) => {
    document.execCommand(command, false, null);
    editorRef.current?.focus();
    updateActiveFormats();
    if (onChange) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = (e) => {
    if (onChange) {
      isInternalChange.current = true;
      onChange(e.currentTarget.innerHTML);
    }
    updateActiveFormats();
  };

  const handleKeyUp = () => {
    updateActiveFormats();
  };

  const handleMouseUp = () => {
    updateActiveFormats();
  };

  // Only update content from external value changes, not internal typing
  React.useEffect(() => {
    if (
      !isInternalChange.current &&
      editorRef.current &&
      editorRef.current.innerHTML !== value
    ) {
      editorRef.current.innerHTML = value;
    }
    isInternalChange.current = false;
  }, [value]);

  return (
    <div className="text-editor">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyUp={handleKeyUp}
        onMouseUp={handleMouseUp}
        className="text-editor__content"
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />{" "}
      <div className="text-editor__toolbar">
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className={`text-editor__button ${
            activeFormats.bold ? "active" : ""
          }`}
          aria-label="Bold"
        >
          <Icon>format_bold</Icon>
        </button>

        <button
          type="button"
          onClick={() => execCommand("italic")}
          className={`text-editor__button ${
            activeFormats.italic ? "active" : ""
          }`}
          aria-label="Italic"
        >
          <Icon>format_italic</Icon>
        </button>

        <button
          type="button"
          onClick={() => execCommand("underline")}
          className={`text-editor__button ${
            activeFormats.underline ? "active" : ""
          }`}
          aria-label="Underline"
        >
          <Icon>format_underlined</Icon>
        </button>

        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          className={`text-editor__button ${
            activeFormats.orderedList ? "active" : ""
          }`}
          aria-label="Numbered List"
        >
          <Icon>format_list_numbered</Icon>
        </button>

        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          className={`text-editor__button ${
            activeFormats.unorderedList ? "active" : ""
          }`}
          aria-label="Bullet List"
        >
          <Icon>format_list_bulleted</Icon>
        </button>
      </div>
    </div>
  );
}
