"use client"

import { buttonVariants, Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courseLevels, courseStatus, courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CourseCreation() {
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema) as Resolver<CourseSchemaType>,
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 0,
      duration: 0,
      level: "Beginner",
      category: "",
      smallDescription: "",
      slug: "",
      courseStatus: "Draft",
    },
  });

  function onSubmit(value: CourseSchemaType){
    console.log(value)
  }



  return (
    <>
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className={buttonVariants()}>
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Create Courses</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Basic information</CardTitle>
          <CardDescription>Provide basic information about the course</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Course title" {...form.register("title")} />
              {form.formState.errors.title?.message && (
                <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Course description" {...form.register("description")} />
              {form.formState.errors.description?.message && (
                <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" {...form.register("price", { valueAsNumber: true })} />
                {form.formState.errors.price?.message && (
                  <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input id="duration" type="number" {...form.register("duration", { valueAsNumber: true })} />
                {form.formState.errors.duration?.message && (
                  <p className="text-sm text-destructive">{form.formState.errors.duration.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="level">Level</Label>
                <select
                  id="level"
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  {...form.register("level")}
                >
                  {courseLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {form.formState.errors.level?.message && (
                  <p className="text-sm text-destructive">{form.formState.errors.level.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="courseStatus">Status</Label>
                <select
                  id="courseStatus"
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  {...form.register("courseStatus")}
                >
                  {courseStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {form.formState.errors.courseStatus?.message && (
                  <p className="text-sm text-destructive">{form.formState.errors.courseStatus.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="Course category" {...form.register("category")} />
              {form.formState.errors.category?.message && (
                <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="smallDescription">Short Description</Label>
              <Input id="smallDescription" placeholder="Short description" {...form.register("smallDescription")} />
              {form.formState.errors.smallDescription?.message && (
                <p className="text-sm text-destructive">{form.formState.errors.smallDescription.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="course-slug" {...form.register("slug")} />
              {form.formState.errors.slug?.message && (
                <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
              )}
            </div>

            <Button type="submit">Save Course</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
