"use client"

import { AdminLessonType } from "@/app/data/admin/admin-get-lesson"
import { Uploader } from "@/components/file-uploader/Uploader";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { Resolver, useForm } from "react-hook-form";
import { updateLesson } from "../action";
import { toast } from "sonner";

interface iAppProps {
  data: AdminLessonType;
  chapterId: string;
  courseId: string;
}

export function LessonForm({chapterId, data, courseId}: iAppProps) {
  const[pending, startTransition] = useTransition()
  const form = useForm<LessonSchemaType>({
      resolver: zodResolver(lessonSchema) as Resolver<LessonSchemaType>,
      defaultValues: {
        name: data.title,
        chapterId: chapterId,
        courseId: courseId,
        description: data.description ?? undefined,
        videoKey: data.videoKey ?? undefined,
        thumbnailKey: data.thumbnailKey ?? undefined,
      },
    });

    function onSubmit(value: LessonSchemaType){
    startTransition(async () => {
      const {data: result, error} = await tryCatch(updateLesson(value, data.id))
      if(error){
        toast.error("An unexpected errror occured. Please try again later.")
        return
      }
      if(result.status === 'success') {
        toast.success(result.message)
      }
      else if(result.status === "error"){
        toast.error(result.message)
        form.reset()
      }
    })
  }

  return (
    <div>
      <Link href={`/app/admin/courses/${courseId}/edit`} className={buttonVariants({variant: 'outline', 
        className: "mb-6"
      })}> 
        <ArrowLeft className="size-4"/>
        <span>Go Back</span>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Configuration</CardTitle>
          <CardDescription>Configure the video and description for this lesson.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Lesson Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chapter XYZ" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              ></FormField>
              <FormField control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Chapter XYZ" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              ></FormField>

              <FormField control={form.control}
              name="thumbnailKey"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Thumbnail Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Chapter XYZ" {...field}/>
                  </FormControl>
                  <Uploader onChange={field.onChange} value={field.value} fileTypeAccepted="image"/>
                  <FormMessage />
                </FormItem>
              )}
              ></FormField>

              <FormField control={form.control}
              name="videoKey"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Video File</FormLabel>
                  <FormControl>
                    <Input placeholder="Chapter XYZ" {...field}/>
                  </FormControl>
                  <Uploader onChange={field.onChange} fileTypeAccepted="video"/>
                  <FormMessage />
                </FormItem>
              )}
              ></FormField>

              <Button type={"submit"} disabled={pending}>
                {pending ? "Saving..." : "Save Lesson"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}