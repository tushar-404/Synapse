
import {type Editor} from "@tiptap/react"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1Icon, Heading2Icon, Heading3Icon, Italic, List, ListOrdered, Redo, Strikethrough, Undo } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
interface iAppProps {
    editor: Editor | null
}

export default function Menubar({editor} : iAppProps) {
    if(!editor) return null;

    return (
        <div className="border border-input rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
            <TooltipProvider>
                <div className="flex flex-wrap gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().toggleBold().run()
                            }}
                            className={cn(
                                editor.isActive("bold") && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive("bold")}>
                                <Bold />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Bold
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().toggleItalic().run()
                            }}
                            className={cn(
                                editor.isActive("italic") && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive("italic")}>
                                <Italic />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Italic
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().toggleStrike().run()
                            }}
                            className={cn(
                                editor.isActive("strike") && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive("strike")}>
                                <Strikethrough />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Strike
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().toggleHeading({level:1}).run()
                            }}
                            className={cn(
                                editor.isActive("Heading") && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive("heading", {level: 1})}
                            >
                                <Heading1Icon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Heading 1
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().toggleHeading({level:2}).run()
                            }}
                            className={cn(
                                editor.isActive("heading") && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive("Heading", {level: 2})}
                            >
                                <Heading2Icon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Heading 2
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().toggleHeading({level:3}).run()
                            }}
                            className={cn(
                                editor.isActive("Heading") && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive("Heading", {level: 3})}
                            >
                                <Heading3Icon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Heading 3
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().toggleBulletList().run()
                            }}
                            className={cn(
                                editor.isActive("bulletList") && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive("bulletList")}
                            >
                                <List />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Bullet List
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().toggleOrderedList().run()
                            }}
                            className={cn(
                                editor.isActive("orderedList") && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive("orderedList")}
                            >
                                <ListOrdered />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Ordered List
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="w-px h-6 bg-border mx-2"></div>
                <div className="flex flex-wrap gap-1 ">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().setTextAlign("left").run()
                            }}
                            className={cn(
                                editor.isActive({textAlign: "left"}) && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive({textAlign: "left"})}
                            >
                                <AlignLeft />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Left Alignment
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().setTextAlign("right").run()
                            }}
                            className={cn(
                                editor.isActive({textAlign: "right"}) && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive({textAlign: "right"})}
                            >
                                <AlignRight />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Right Alignment
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm"
                            onPressedChange={() => {
                                editor.chain().focus().setTextAlign("center").run()
                            }}
                            className={cn(
                                editor.isActive({textALign: "center"}) && 'bg-muted text-muted-foreground'
                            )}
                            pressed={editor.isActive({textAlign: "center"})}
                            >
                                <AlignCenter />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Center Alignment
                        </TooltipContent>
                    </Tooltip>
                    <div className="w-px h-6 bg-border mx-2">
                    </div>
                    <div className="flex flex-wrap gap-1 ">
                            <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="sm" disabled={!editor.can().undo()} variant="ghost" onClick={() => {
                                editor.chain().focus().undo().run()
                            }}>
                                <Undo />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Undo
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="sm" disabled={!editor.can().redo()} variant="ghost" onClick={() => {
                                editor.chain().focus().redo().run()
                            }}>
                                <Redo />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Redo
                        </TooltipContent>
                    </Tooltip>
                    </div>
                </div>
            </TooltipProvider>
        </div>
    )
}