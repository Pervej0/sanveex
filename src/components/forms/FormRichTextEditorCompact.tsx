"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import { TextStyle } from "@tiptap/extension-text-style";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  VideoIcon,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Quote,
} from "lucide-react";
import MediaSelector from "@/components/dashboard/media-selector";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";

interface FormRichTextEditorCompactProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  minHeight?: number;
  allowImages?: boolean;
  allowVideos?: boolean;
}

export default function FormRichTextEditorCompact({
  name,
  label,
  description,
  placeholder = "Start writing...",
  required,
  className,
  minHeight = 150,
  allowImages = true,
  allowVideos = true,
}: FormRichTextEditorCompactProps) {
  const { control, setValue, watch } = useFormContext();
  const [isMounted, setIsMounted] = useState(false);
  const [mediaSelector, setMediaSelector] = useState<{
    isOpen: boolean;
    type: "image" | "video" | null;
  }>({ isOpen: false, type: null });

  const fieldValue = watch(name);

  // Handle client-side mounting
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: false, // We'll use the dedicated extension
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      Underline,
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-muted-foreground pl-4 italic my-4",
        },
      }),
      TextStyle,
    ],
    content: fieldValue || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(name, html, { shouldValidate: true, shouldDirty: true });
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none focus:outline-none min-h-[${minHeight - 60}px] overflow-y-auto p-4`,
        style: `min-height: ${minHeight - 60}px;`,
        spellcheck: "true",
      },
      handleKeyDown: (view, event) => {
        // Handle keyboard shortcuts
        if (event.ctrlKey || event.metaKey) {
          switch (event.key) {
            case "b":
              event.preventDefault();
              editor?.chain().focus().toggleBold().run();
              return true;
            case "i":
              event.preventDefault();
              editor?.chain().focus().toggleItalic().run();
              return true;
            case "u":
              event.preventDefault();
              editor?.chain().focus().toggleUnderline().run();
              return true;
            case "z":
              if (event.shiftKey) {
                event.preventDefault();
                editor?.chain().focus().redo().run();
              } else {
                event.preventDefault();
                editor?.chain().focus().undo().run();
              }
              return true;
            default:
              return false;
          }
        }
        return false;
      },
    },
  });

  // Update editor content when form value changes externally
  React.useEffect(() => {
    if (editor && fieldValue !== editor.getHTML()) {
      editor.commands.setContent(fieldValue || "");
    }
  }, [editor, fieldValue]);

  const handleImageSelect = useCallback(() => {
    setMediaSelector({ isOpen: true, type: "image" });
  }, []);

  const handleVideoSelect = useCallback(() => {
    setMediaSelector({ isOpen: true, type: "video" });
  }, []);

  const handleMediaSelect = useCallback(
    (url: string) => {
      if (!editor) return;

      if (mediaSelector.type === "image") {
        editor.chain().focus().setImage({ src: url }).run();
      } else if (mediaSelector.type === "video") {
        // Create a simplified video element for Cloudinary videos
        const videoHtml = `
          <div class="video-wrapper my-4">
            <video controls class="w-full max-w-full h-auto rounded-lg" style="max-height: 400px;" src="${url}">
              Your browser does not support the video tag.
            </video>
          </div>
        `;
        editor.chain().focus().insertContent(videoHtml).run();
      }

      setMediaSelector({ isOpen: false, type: null });
    },
    [editor, mediaSelector.type],
  );

  if (!isMounted || !editor) {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none">
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}
        <div
          className="w-full border border-input bg-background rounded-md animate-pulse"
          style={{ minHeight }}
        >
          <div className="bg-muted h-10 rounded-t-md"></div>
          <div className="p-4 space-y-2">
            <div className="bg-muted h-3 w-3/4 rounded"></div>
            <div className="bg-muted h-3 w-1/2 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="border border-input rounded-lg bg-background overflow-hidden ">
              {/* Compact Toolbar */}
              <div className="border-b border-border bg-gradient-to-r from-muted/20 to-muted/40 p-2.5">
                <div className="flex gap-1.5 flex-wrap">
                  {/* Essential formatting group */}
                  <div className="flex items-center gap-0.5 p-1 border border-border/50 rounded-md bg-background/50">
                    <Toggle
                      size="sm"
                      pressed={editor.isActive("bold")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleBold().run()
                      }
                      aria-label="Bold"
                      className="h-6 w-6"
                    >
                      <Bold className="h-3 w-3" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive("italic")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleItalic().run()
                      }
                      aria-label="Italic"
                      className="h-6 w-6"
                    >
                      <Italic className="h-3 w-3" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive("underline")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleUnderline().run()
                      }
                      aria-label="Underline"
                      className="h-6 w-6"
                    >
                      <UnderlineIcon className="h-3 w-3" />
                    </Toggle>
                  </div>

                  {/* Text Color */}
                  <div className="flex items-center p-1 border border-border/50 rounded-md bg-background/50">
                    <input
                      type="color"
                      value={
                        editor.getAttributes("textStyle").color || "#000000"
                      }
                      onChange={(e) =>
                        editor.chain().focus().setColor(e.target.value).run()
                      }
                      className="w-6 h-6 rounded border border-border cursor-pointer"
                      title="Text Color"
                      aria-label="Text Color"
                    />
                  </div>

                  {/* Heading Group */}
                  <div className="flex items-center p-1 border border-border/50 rounded-md bg-background/50">
                    <select
                      value={
                        editor.isActive("heading", { level: 1 })
                          ? "1"
                          : editor.isActive("heading", { level: 2 })
                            ? "2"
                            : editor.isActive("heading", { level: 3 })
                              ? "3"
                              : ""
                      }
                      onChange={(e) => {
                        const level = parseInt(e.target.value);
                        if (level) {
                          editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: level as any })
                            .run();
                        } else {
                          editor.chain().focus().setParagraph().run();
                        }
                      }}
                      className="bg-background border border-border rounded px-2 py-0.5 text-xs min-w-[70px] h-6"
                      aria-label="Text format"
                    >
                      <option value="">Normal</option>
                      <option value="1">H1</option>
                      <option value="2">H2</option>
                      <option value="3">H3</option>
                    </select>
                  </div>

                  {/* Lists and Quote Group */}
                  <div className="flex items-center gap-0.5 p-1 border border-border/50 rounded-md bg-background/50">
                    <Toggle
                      size="sm"
                      pressed={editor.isActive("bulletList")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
                      aria-label="Bullet List"
                      className="h-6 w-6"
                    >
                      <List className="h-3 w-3" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive("orderedList")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                      aria-label="Numbered List"
                      className="h-6 w-6"
                    >
                      <ListOrdered className="h-3 w-3" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive("blockquote")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleBlockquote().run()
                      }
                      aria-label="Quote"
                      className="h-6 w-6"
                    >
                      <Quote className="h-3 w-3" />
                    </Toggle>
                  </div>

                  {/* Media Group */}
                  {(allowImages || allowVideos) && (
                    <div className="flex items-center gap-0.5 p-1 border border-border/50 rounded-md bg-background/50">
                      {allowImages && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleImageSelect}
                          aria-label="Insert Image"
                          className="h-6 w-6 p-0"
                        >
                          <ImageIcon className="h-3 w-3" />
                        </Button>
                      )}

                      {allowVideos && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleVideoSelect}
                          aria-label="Insert Video"
                          className="h-6 w-6 p-0"
                        >
                          <VideoIcon className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Editor */}
              <div className="relative">
                <EditorContent
                  editor={editor}
                  className="shadow-none focus:ring-0"
                  style={{
                    minHeight: minHeight - 50,
                  }}
                />
                {(!fieldValue || fieldValue === "<p></p>") && (
                  <div className="absolute top-4 left-4 pointer-events-none text-muted-foreground">
                    {placeholder}
                  </div>
                )}
              </div>
            </div>
          </FormControl>

          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          <FormMessage />

          <MediaSelector
            isOpen={mediaSelector.isOpen}
            onClose={() => setMediaSelector({ isOpen: false, type: null })}
            onSelect={handleMediaSelect}
            title={`Select ${mediaSelector.type === "image" ? "Image" : "Video"}`}
          />
        </FormItem>
      )}
    />
  );
}
