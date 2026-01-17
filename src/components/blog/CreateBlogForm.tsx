import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "@/api/blogs"
import type { Blog } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function CreateBlogForm() {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")

  const mutation = useMutation({
    mutationFn: (blog: Omit<Blog, "id">) => createBlog(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      setTitle("")
      setDescription("")
      setContent("")
      setCategory("")
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutation.mutate({
      title,
      description,
      content,
      category: category.split(",").map((c) => c.trim()),
      date: new Date().toISOString(),
      coverImage:
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">Create New Blog</h2>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        required
      />

      <Input
        placeholder="Categories (comma separated)"
        value={category}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCategory(e.target.value)
        }
        required
      />

      <Textarea
        placeholder="Short description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
        required
      />

      <Textarea
        placeholder="Full content"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        required
      />

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Blog"}
      </Button>

      {mutation.isError && (
        <p className="text-sm text-red-500">Error creating blog</p>
      )}
    </form>
  )
}
