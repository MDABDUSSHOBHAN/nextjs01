"use client"

import { Fragment, useState } from "react"

import { Button } from "../ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
 
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"

import { DialogClose } from "@radix-ui/react-dialog";
// ,loading,setLoading,blogFormData,setBlogFormData
function AddnewBlog({openBlog,setOpenBlog,setCurrentEditedblokID,currentEditedblokID,loading,setLoading,blogFormData,setBlogFormData,handelSavedBlogData}){
  // const [blogFormData, setBlogFormData] = useState({
  //   title: '',
  //   description: '',
  // });

//   const handleChange = (event) => {
//     setBlogFormData({
//       ...blogFormData,
// value: event.target.value, // Dynamically update state based on input name
//     });
//   };




    return(


      <Fragment>
           <div>
  <Button onClick={() => setOpenBlog(true)}>Add New Block </Button>
</div>

{/* new one */}
<Dialog open={openBlog} onOpenChange={()=>{

setOpenBlog(false);
setBlogFormData({

    title: '',
  description: ''
})

setCurrentEditedblokID(null)


}}>
      <DialogContent className="sm:max-w-md" aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle > {currentEditedblokID ? ' Edit blog': 'Add New Blogs'}  </DialogTitle>
        </DialogHeader>
        
        <div id="dialog-description" className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <input
              id="title"
              className="col-span-3"
              name="title"
              placeholder="Enter blog title"
              value={blogFormData.title}

              onChange={(event) => setBlogFormData({
                ...blogFormData,
                title: event.target.value,


                
              })}
              
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Details
            </Label>
            <input
              id="description"
              className="col-span-3"
              name="description"
              placeholder="Enter blog description"
              value={blogFormData.description}
             onChange={(event) => setBlogFormData({

              ...blogFormData,
              description:event.target.value,
             })}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
           
          <Button 
          
          onClick = {handelSavedBlogData}
          type="submit"
          
          
          >{

            loading ? 'saving changes' : 'save change'
          }</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </Fragment>
    )
}

export default AddnewBlog