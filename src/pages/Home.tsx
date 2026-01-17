import BlogList from "@/components/blog/BlogList"
import CreateBlogForm from "@/components/blog/CreateBlogForm"

export default function Home() {
  return (
    <div className="space-y-10">
      <CreateBlogForm />
      <BlogList />
    </div>
  )
}

