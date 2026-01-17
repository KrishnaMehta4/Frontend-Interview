import type { Blog } from "@/types/blog"

const API_URL = "http://localhost:3001"

export async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${API_URL}/blogs`)

  if (!res.ok) {
    throw new Error("Failed to fetch blogs")
  }

  return res.json()
}

export async function getBlogById(id: string): Promise<Blog> {
  const res = await fetch(`${API_URL}/blogs/${id}`)

  if (!res.ok) {
    throw new Error("Failed to fetch blog")
  }

  return res.json()
}

export async function createBlog(
  blog: Omit<Blog, "id">
): Promise<Blog> {
  const res = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })

  if (!res.ok) {
    throw new Error("Failed to create blog")
  }

  return res.json()
}
