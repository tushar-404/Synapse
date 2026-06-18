'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { tryCatch } from '@/hooks/try-catch';
import { Plus } from 'lucide-react';
import { useState, useTransition } from 'react';
import { createChapter } from '../action';
import { toast } from 'sonner';

export function NewChapterModal({
  courseId,
}: {
  courseId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [pending, startTransition] = useTransition();

  async function handleSave() {
    if (!name.trim()) {
      toast.error('Chapter name is required');
      return;
    }

    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        createChapter({
          name,
          courseId,
        })
      );

      if (error) {
        console.error(error);
        toast.error('An unexpected error occurred');
        return;
      }

      if (result.status === 'success') {
        toast.success(result.message);
        setName('');
        setIsOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setName('');
    }

    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="size-4" />
          New Chapter
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Chapter</DialogTitle>
          <DialogDescription>
            What would you like to name your chapter?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Chapter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <DialogFooter>
            <Button
              disabled={pending}
              onClick={handleSave}
            >
              {pending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}