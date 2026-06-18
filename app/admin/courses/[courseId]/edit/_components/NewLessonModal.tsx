"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { tryCatch } from "@/hooks/try-catch";
import { createLesson } from "../action";

export function NewLessonModal({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();

  async function handleSubmit() {
    if (!name.trim()) {
      toast.error("Lesson name is required");
      return;
    }

    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        createLesson({
          name,
          courseId,
          chapterId,
        })
      );

      console.log(result);

      if (error) {
        toast.error("An unexpected error occurred. Please try again");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        setName("");
        setIsOpen(false);
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setName("");
    }

    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-center gap-1">
          <Plus className="size-4" />
          New Lesson
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Lesson</DialogTitle>
          <DialogDescription>
            What would you like to name your lesson?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Name
            </label>

            <Input
              placeholder="Lesson Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              disabled={pending}
              onClick={handleSubmit}
            >
              {pending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}