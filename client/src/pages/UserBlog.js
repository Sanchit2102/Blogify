import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'

const UserBlog = () => {
  const [blogs,setBlogs] =useState([]);

  const getUserBlogs =async()=>{
try {
  const response = await fetch(
    "/api/v1/blog/users-blog",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    }
  )
  const data = await response.json()
 console.log(data)
  if(data?.success){
    setBlogs(data?.blogs)
  }

} catch (error) {
  console.log(error)
}
  }

  useEffect(() => {  
   getUserBlogs()
  }, [])
  
  return (
    <>
        {blogs.length !==0 ? blogs.map((blog)=>{
          return(
            <BlogCard
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog.user.username}
                dateTime={blog.date}
                id={blog._id}
                isUser={true}
              />
          )
        }):<p style={{marginTop:"200px" ,fontSize:"32px",textAlign:'center',color:"grey"}}>"No blogs to Display"</p>
        }
    </>
  )
}

export default UserBlog