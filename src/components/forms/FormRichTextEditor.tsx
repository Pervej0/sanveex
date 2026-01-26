"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";

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
  Palette,
  Type,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Undo2,
  Redo2,
  StrikethroughIcon,
} from "lucide-react";
import MediaSelector from "@/components/dashboard/media-selector";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";

interface FormRichTextEditorProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  minHeight?: number;
  maxHeight?: number;
  allowImages?: boolean;
  allowVideos?: boolean;
}

export default function FormRichTextEditor({
  name,
  label,
  description,
  placeholder = "Start writing...",
  required,
  className,
  minHeight = 200,
  maxHeight = 500,
  allowImages = true,
  allowVideos = true,
}: FormRichTextEditorProps) {
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
      Color,
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: fieldValue || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(name, html, { shouldValidate: true, shouldDirty: true });
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none focus:outline-none min-h-[${minHeight - 80}px] max-h-[${maxHeight - 80}px] overflow-y-auto p-4`,
        style: `min-height: ${minHeight - 80}px; max-height: ${maxHeight - 80}px;`,
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
        // Use direct src attribute for ImageKit/Cloudinary URLs
        const videoHtml = `<div class="video-wrapper my-4">
          <video controls class="w-full max-w-full h-auto rounded-lg" style="max-height: 400px;" src="${url}">
            Your browser does not support the video tag.
          </video>
        </div>`;
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
          <div className="bg-muted h-12 rounded-t-md"></div>
          <div className="p-4 space-y-3">
            <div className="bg-muted h-4 w-3/4 rounded"></div>
            <div className="bg-muted h-4 w-1/2 rounded"></div>
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
              {/* Toolbar */}
              <div className="border-b border-border bg-gradient-to-r from-muted/20 to-muted/40 p-3">
                <div className="flex flex-wrap gap-1.5">
                  {/* Text Formatting Group */}
                  <div className="flex items-center gap-0.5 p-1 border border-border/50 rounded-md bg-background/50">
                    <Toggle
                      size="sm"
                      pressed={editor.isActive("bold")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleBold().run()
                      }
                      className="h-7 w-7"
                    >
                      <Bold className="h-3.5 w-3.5" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive("italic")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleItalic().run()
                      }
                      className="h-7 w-7"
                    >
                      <Italic className="h-3.5 w-3.5" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive("strike")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleStrike().run()
                      }
                      className="h-7 w-7"
                    >
                      <StrikethroughIcon className="h-3.5 w-3.5" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive("underline")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleUnderline().run()
                      }
                      className="h-7 w-7"
                    >
                      <UnderlineIcon className="h-3.5 w-3.5" />
                    </Toggle>
                  </div>

                  {/* Color Group */}
                  <div className="flex items-center gap-1 p-1 border border-border/50 rounded-md bg-background/50">
                    <div className="relative">
                      <input
                        type="color"
                        value={
                          editor.getAttributes("textStyle").color || "#000000"
                        }
                        onChange={(e) =>
                          editor.chain().focus().setColor(e.target.value).run()
                        }
                        className="w-7 h-7 rounded border border-border cursor-pointer"
                        title="Text Color"
                      />
                      <Palette className="h-2.5 w-2.5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white mix-blend-difference" />
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => editor.chain().focus().unsetColor().run()}
                      title="Remove text color"
                      className="h-7 w-7 p-0"
                    >
                      <Type className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Headings */}
                  <div className="flex items-center p-1 border border-border/50 rounded-md bg-background/50">
                    <select
                      value={
                        editor.isActive("heading", { level: 1 })
                          ? "1"
                          : editor.isActive("heading", { level: 2 })
                            ? "2"
                            : editor.isActive("heading", { level: 3 })
                              ? "3"
                              : editor.isActive("heading", { level: 4 })
                                ? "4"
                                : editor.isActive("heading", { level: 5 })
                                  ? "5"
                                  : editor.isActive("heading", { level: 6 })
                                    ? "6"
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
                      className="bg-background border border-border rounded px-2 py-1 text-xs min-w-[90px] h-7"
                    >
                      <option value="">Paragraph</option>
                      <option value="1">Heading 1</option>
                      <option value="2">Heading 2</option>
                      <option value="3">Heading 3</option>
                      <option value="4">Heading 4</option>
                      <option value="5">Heading 5</option>
                      <option value="6">Heading 6</option>
                    </select>
                  </div>

                  {/* Alignment Group */}
                  <div className="flex items-center gap-0.5 p-1 border border-border/50 rounded-md bg-background/50">
                    <Toggle
                      size="sm"
                      pressed={editor.isActive({ textAlign: "left" })}
                      onPressedChange={() =>
                        editor.chain().focus().setTextAlign("left").run()
                      }
                      className="h-7 w-7"
                    >
                      <AlignLeft className="h-3.5 w-3.5" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive({ textAlign: "center" })}
                      onPressedChange={() =>
                        editor.chain().focus().setTextAlign("center").run()
                      }
                      className="h-7 w-7"
                    >
                      <AlignCenter className="h-3.5 w-3.5" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive({ textAlign: "right" })}
                      onPressedChange={() =>
                        editor.chain().focus().setTextAlign("right").run()
                      }
                      className="h-7 w-7"
                    >
                      <AlignRight className="h-3.5 w-3.5" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive({ textAlign: "justify" })}
                      onPressedChange={() =>
                        editor.chain().focus().setTextAlign("justify").run()
                      }
                      className="h-7 w-7"
                    >
                      <AlignJustify className="h-3.5 w-3.5" />
                    </Toggle>
                  </div>

                  {/* Lists Group */}
                  <div className="flex items-center gap-0.5 p-1 border border-border/50 rounded-md bg-background/50">
                    <Toggle
                      size="sm"
                      pressed={editor.isActive("bulletList")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
                      className="h-7 w-7"
                    >
                      <List className="h-3.5 w-3.5" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive("orderedList")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                      className="h-7 w-7"
                    >
                      <ListOrdered className="h-3.5 w-3.5" />
                    </Toggle>
                  </div>

                  {/* Special Formatting Group */}
                  <div className="flex items-center gap-0.5 p-1 border border-border/50 rounded-md bg-background/50">
                    <Toggle
                      size="sm"
                      pressed={editor.isActive("blockquote")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleBlockquote().run()
                      }
                      className="h-7 w-7"
                    >
                      <Quote className="h-3.5 w-3.5" />
                    </Toggle>

                    <Toggle
                      size="sm"
                      pressed={editor.isActive("codeBlock")}
                      onPressedChange={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                      }
                      className="h-7 w-7"
                    >
                      <Code className="h-3.5 w-3.5" />
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
                          className="h-7 w-7 p-0"
                        >
                          <ImageIcon className="h-3.5 w-3.5" />
                        </Button>
                      )}

                      {allowVideos && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleVideoSelect}
                          className="h-7 w-7 p-0"
                        >
                          <VideoIcon className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  )}

                  {/* History Group */}
                  <div className="flex items-center gap-0.5 p-1 border border-border/50 rounded-md bg-background/50">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => editor.chain().focus().undo().run()}
                      disabled={!editor.can().undo()}
                      className="h-7 w-7 p-0"
                    >
                      <Undo2 className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => editor.chain().focus().redo().run()}
                      disabled={!editor.can().redo()}
                      className="h-7 w-7 p-0"
                    >
                      <Redo2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Editor */}
              <div className="relative">
                <EditorContent
                  editor={editor}
                  className="rich-text-content"
                  style={{
                    minHeight: minHeight - 60,
                    maxHeight: maxHeight - 60,
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
