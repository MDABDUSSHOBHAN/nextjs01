"use client"

import { useState } from "react";
import AddnewBlog from "../add-new-blog";


const initialBlogFormData = {

  title: '',
  description: ''
}




function Ccc() {
  const [openBlog, setOpenBlog] = useState(false);

  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);

  console.log(blogFormData);
  // This is api Blog data...
  async function handelSavedBlogData() {

    try {

      const apiResponse = await fetch("api/addblog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      console.log(result);


    }

    catch (error) {

      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }

  }


  return (
    <div>



      <div className="min-h-screen flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">

        {/* This is add blogs section of my project */}
        <AddnewBlog openBlog={openBlog}
          setOpenBlog={setOpenBlog}
          loading={loading}
          setLoading={setLoading}
          blogFormData={blogFormData}
          setBlogFormData={setBlogFormData}
          handelSavedBlogData={handelSavedBlogData}

        />




      </div>


    </div>
  )
}

export default Ccc;