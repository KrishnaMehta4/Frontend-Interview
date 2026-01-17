import { useQuery } from "@tanstack/react-query"
import { getBlogs } from "@/api/blogs"
import type { Blog } from "@/types/blog"
import { useNavigate } from "react-router-dom"


export default function BlogList() {
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  })

  if (isLoading) {
  return <p className="text-muted-foreground">Loading blogs...</p>
}

if (isError) {
  return <p className="text-red-500">Failed to load blogs</p>
}

  return (
    <div className="space-y-4">
      {data?.map((blog: Blog) => (
        <div
          key={blog.id}
          onClick={() => navigate(`/blogs/${blog.id}`)}
         className="rounded-lg border p-4 hover:bg-muted transition-colors cursor-pointer"

        >
          <div className="text-sm text-muted-foreground">
            {blog.category.join(", ")}
          </div>

          <h2 className="text-lg font-semibold">{blog.title}</h2>

          <p className="text-sm text-muted-foreground">
            {blog.description}
          </p>
        </div>
      ))}
    </div>
  )
}
