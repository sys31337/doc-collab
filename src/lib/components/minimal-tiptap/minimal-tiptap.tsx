import * as React from 'react'
import './styles/index.css'

import type { Content, Editor } from '@tiptap/react'
import type { UseMinimalTiptapEditorProps } from './hooks/use-minimal-tiptap'
import { EditorContent } from '@tiptap/react'
import { Separator } from '@lib/components/ui/separator'
import { cn } from '@lib/utils'
import Highlight from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import { SectionOne } from './components/section/one'
import { SectionTwo } from './components/section/two'
import { SectionThree } from './components/section/three'
import { SectionFour } from './components/section/four'
import { SectionFive } from './components/section/five'
import { LinkBubbleMenu } from './components/bubble-menu/link-bubble-menu'
import { useMinimalTiptapEditor } from './hooks/use-minimal-tiptap'
import { MeasuredContainer } from './components/measured-container'
import { useLiveblocksExtension } from '@liveblocks/react-tiptap'
import StarterKit from '@tiptap/starter-kit'
import { useMyPresence, useOthers } from '@liveblocks/react'
import Cursor from '@components/Cursor'

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content
  onChange?: (value: Content) => void
  className?: string
  editorContentClassName?: string
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={['bold', 'italic', 'underline', 'strikethrough', 'code', 'clearFormatting']}
        mainActionCount={3}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour editor={editor} activeActions={['orderedList', 'bulletList']} mainActionCount={0} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive editor={editor} activeActions={['codeBlock', 'blockquote', 'horizontalRule']} mainActionCount={0} />
    </div>
  </div>
)

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

export const MinimalTiptapEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(
  ({ value, onChange, className, editorContentClassName, ...props }, ref) => {
    const [, updateMyPresence] = useMyPresence();
    const others = useOthers();
    const liveblocks = useLiveblocksExtension();
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      ...props,
      extensions: [
        liveblocks,
        StarterKit.configure({
          blockquote: {
            HTMLAttributes: {
              class: "tiptap-blockquote",
            },
          },
          code: {
            HTMLAttributes: {
              class: "tiptap-code",
            },
          },
          codeBlock: {
            languageClassPrefix: "language-",
            HTMLAttributes: {
              class: "tiptap-code-block",
              spellcheck: false,
            },
          },
          heading: {
            levels: [1, 2, 3],
            HTMLAttributes: {
              class: "tiptap-heading",
            },
          },
          // The Collaboration extension comes with its own history handling
          history: false,
          horizontalRule: {
            HTMLAttributes: {
              class: "tiptap-hr",
            },
          },
          listItem: {
            HTMLAttributes: {
              class: "tiptap-list-item",
            },
          },
          orderedList: {
            HTMLAttributes: {
              class: "tiptap-ordered-list",
            },
          },
          paragraph: {
            HTMLAttributes: {
              class: "tiptap-paragraph",
            },
          },
        }),
        Highlight.configure({
          HTMLAttributes: {
            class: "tiptap-highlight",
          },
        }),
        Image.configure({
          HTMLAttributes: {
            class: "tiptap-image",
          },
        }),
        Link.configure({
          HTMLAttributes: {
            class: "tiptap-link",
          },
        }),
        Placeholder.configure({
          placeholder: "Start writing…",
          emptyEditorClass: "tiptap-empty",
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Typography,
        Youtube.configure({
          modestBranding: true,
          HTMLAttributes: {
            class: "tiptap-youtube",
          },
        }),
      ],
    })

    if (!editor) {
      return null
    }

    return (
      <MeasuredContainer
        onPointerMove={(event: { clientX: number, clientY: number }) => {
          // Update the user cursor position on every pointer move
          updateMyPresence({
            cursor: {
              x: Math.round(event.clientX),
              y: Math.round(event.clientY),
            },
          });
        }}
        onPointerLeave={() =>
          // When the pointer goes out, set cursor to null
          updateMyPresence({
            cursor: null,
          })
        }
        as="div"
        name="editor"
        ref={ref}
        className={cn(
          'flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary',
          className
        )}
      >
        {
          others.map(({ connectionId, presence }) => {
            if (presence.cursor === null) {
              return null;
            }

            return (
              <Cursor
                key={`cursor-${connectionId}`}
                color={COLORS[connectionId % COLORS.length]}
                x={(presence.cursor as {x: number})?.x || 0}
                y={(presence.cursor as {y: number})?.y || 0}
              />
            );
          })
        }
        <Toolbar editor={editor} />
        <EditorContent editor={editor} className={cn('minimal-tiptap-editor', editorContentClassName)} />
        <LinkBubbleMenu editor={editor} />
      </MeasuredContainer>
    )
  }
)

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor'

export default MinimalTiptapEditor
