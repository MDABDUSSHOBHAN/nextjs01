import Ccc from "@/components/ccc";
import { NextResponse } from "next/server";

async function fetchListOfData() {

    try{

        const apiResponse = await fetch('http://localhost:3000/api/getblock',{

            method:'GET',
            cache:'no-store',

            

        })
        const result = await apiResponse.json();
        return result?.data;


    } catch(error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Somethig went Wrong! Please try again",
        });
    }
    
}





async function Blogs(){

  const bologList = await fetchListOfData();
  console.log(bologList);

    return(
        <div>
        
  
   
       <Ccc bologList={bologList} ></Ccc>


  
       
        </div>
    )
}

export default Blogs;