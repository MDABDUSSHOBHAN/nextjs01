"use client"

import { useEffect, useState } from "react";

import AddnewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";


const initialBlogFormData = {

  title: '',
  description: ''
}




function Ccc({bologList}) {
  const [openBlog, setOpenBlog] = useState(false);

  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const[currentEditedblokID, setCurrentEditedblokID] = useState(null);

  // const router = useRouter();

  // useEffect(()=>{
  //   router.refresh();
  // },[])

  const router = useRouter();
  useEffect(()=>{

    router.refresh();
  },[])


  console.log(blogFormData);


  // This is api Blog data...
  async function handelSavedBlogData() {
// /api/updateblock?id=${currentEditedblokID}
    try {
      setLoading(true);
      const apiResponse = currentEditedblokID !== null 
      ? await fetch(`/api/updateblock/?id=${currentEditedblokID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogFormData),
        })
      : await fetch("/api/addblog", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogFormData),
        });
      const result = await apiResponse.json();
      console.log(result);
      if(result?.success){
         
           setBlogFormData(initialBlogFormData);
           setOpenBlog(false);
           setLoading(false); 
           setCurrentEditedblokID(null);
           router.refresh();
      }


    }

    catch (error) {

      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);

    }

  }
  console.log(currentEditedblokID)
  async function handelDeleteBlogByID(getCurrentID){

    try{
      const apiResponse = await fetch(`/api/deleteblock/?id=${getCurrentID}`,{

        method:'DELETE',
        

      })
      const result = await apiResponse.json();
      console.log(result)

      if(result?.success){
          router.refresh();
      }

    }catch(e){
      console.log(e)
    }
  }
//Here is emplement Edited Function
function handelEdit(getCurrentBlog){

  setCurrentEditedblokID(getCurrentBlog);
  setBlogFormData({
    title: getCurrentBlog?.title,
    description: getCurrentBlog?.description,
  })
  setOpenBlog(true);
 


}
console.log(currentEditedblokID)



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
          currentEditedblokID = {currentEditedblokID}
          setCurrentEditedblokID={setCurrentEditedblokID}

        />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

    {
      bologList && bologList.length > 0 ?
      
      bologList.map(bologitem => 

        <Card className="mt-5 p-5">
          <CardContent>
            <CardTitle className="mb-5">{bologitem?.title}</CardTitle>
            <CardDescription>{bologitem?.description}</CardDescription>
            <div className="mt-5 flex gap-7 items-center">
              <Button onClick={()=>{handelEdit(bologitem)}}>Edit</Button>
              <Button onClick= {() =>{

                handelDeleteBlogByID(bologitem._id)
              }}>Delete</Button>
            </div>
          </CardContent>
        </Card>
      )
      : <Label className="text-3xl font-bold text-red-700">No data found! Please try again</Label>
    }
      </div>


      </div>


    </div>
  )
}

export default Ccc;