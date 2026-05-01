/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Menubar from "./menubar"
import TextAlign from '@tiptap/extension-text-align'



export default function RichEditor({field} : { field: any}) {
    const editor = useEditor({
        extensions : [StarterKit, TextAlign.configure({
            types:["heading", "paragraph"]
        })],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "min-h-[300] p-4 !w-full !max-w-none"
            }
        },
        onUpdate: ({editor}) => {
            field.onChange(JSON.stringify(editor.getJSON()))
        },

        content: field.value ? JSON.parse(field.value) : "<p> Hello World </p>"
    })
    return (
        <div className='w-full border border-input rounded-lg overflow-hidden dark:bg-input/30'>
            <Menubar editor={editor}/>
            <EditorContent editor={editor} />
        </div>
    )
}