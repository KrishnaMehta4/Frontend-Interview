import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getBlogById } from "@/api/blogs"

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return <p className="p-8">Loading blog...</p>
  }

  if (isError || !data) {
    return <p className="p-8">Failed to load blog</p>
  }

  return (
    <div className="p-8 max-w-3xl">
      <img
        src={data.coverImage}
        alt={data.title}
        className="mb-6 rounded-lg"
      />

      <div className="mb-2 text-sm text-muted-foreground">
        {data.category.join(", ")}
      </div>

      <h1 className="mb-4 text-3xl font-bold">{data.title}</h1>

      <p className="mb-6 text-muted-foreground">{data.description}</p>

      <div className="leading-relaxed">{data.content}</div>
    </div>
  )
}

