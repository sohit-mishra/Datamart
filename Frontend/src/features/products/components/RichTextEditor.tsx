import { useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: Props) {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Placeholder.configure({
        placeholder: "Write product description..."
      })
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className="border rounded-lg transition">

      <div className="flex gap-2 border-b p-2 flex-wrap bg-gray-50 rounded-t-lg">

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 border rounded text-sm transition ${
            editor.isActive("bold")
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 border rounded text-sm transition ${
            editor.isActive("italic")
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 border rounded text-sm transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={`px-3 py-1 border rounded text-sm transition ${
            editor.isActive("bulletList")
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          List
        </button>

      </div>

      <EditorContent
        editor={editor}
        className="p-4 min-h-[160px] max-w-none outline-none focus:outline-none
        [&_.ProseMirror]:outline-none
        [&_.ProseMirror_h2]:text-2xl
        [&_.ProseMirror_h2]:font-bold
        [&_.ProseMirror_h2]:mt-2
        [&_.ProseMirror_ul]:list-disc
        [&_.ProseMirror_ul]:pl-6
        [&_.ProseMirror_li]:mb-1"
      />

    </div>
  )
}