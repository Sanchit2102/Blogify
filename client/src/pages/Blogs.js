import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  // Get all Notes
  const getAllBlogs = async () => {
    try {
      // API Call  with fetch headers
      const response = await fetch(
        "/api/v1/blog/all-blogs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setBlogs(data?.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>{!localStorage.getItem("token") &&  <section className="bg-light">
    <div className="container py-5">
      <div className="row d-flex align-items-center">
        <div className="col-md-6 d-flex align-items-center" style={{flexDirection:"column"}}>
          <h2 className="mb-4 text-center">Welcome to Blogify</h2>
          <p className="lead mb-4">
            Discover and share interesting Blogs with the world. Blogify is a platform for writers, creators, and thinkers to publish their ideas.
          </p>
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
        </div>
        <div className="col-md-6">
          <img src="https://cdn.pixabay.com/photo/2017/01/18/08/25/social-media-1989152__480.jpg" className="img-fluid" alt="Blogify Cover" />
        </div>
      </div>
    </div>
  </section>}
   
<div className="container ">
  <div className="row"> 
  <h2 className="mt-5 text-center">Recent Blogs</h2>
  </div>
</div>

{ blogs.length !== 0
  ? blogs.map((blog) => {
      return (
        <BlogCard
          title={blog.title}
          description={blog.description}
          image={blog.image}
          username={blog.user.username}
          dateTime={blog.date}
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog.user._id}
        />
      );
    }).reverse()
  : <p style={{marginTop:"200px" ,fontSize:"32px",textAlign:'center',color:"grey"}}>"No blogs to Display"</p>}

    </>
  );
};

export default Blogs;
