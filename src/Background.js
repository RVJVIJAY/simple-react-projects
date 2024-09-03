import React, { useState } from 'react'
import axios from 'axios'
const Background = () => {
    const [file,setFile]=useState(null);
    const [imgurl,setImgurl]=useState('');
    const [loading,setLoading]=useState(false);


    const handleremovebg=async(e)=>{
        e.preventDefault();
        const URL='https://api.remove.bg/v1.0/removebg'
        const ApiKey='7YoCDTY4cPwJKvigU5AAw1SF';
        if(!file) return;
        try{
            setLoading(true)
            const formData=new FormData();
            formData.append('image_file',file) // key value pair 
            formData.append('size','auto')
            // console.log(formData)
            const response=await axios.post(URL,formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    'X-Api-Key':ApiKey
                },
                responseType:'blob'
            })
            console.log("responsedata",response.data)
            const url=window.URL.createObjectURL(response.data)
            setImgurl(url)
        }
        catch(err){
            console.log('there was an error plz check',err)
        }finally{
            setLoading(false)
        }

    }

    const handleDownload=()=>{
        if(!imgurl) return ;

        const link=document.createElement('a')
        link.href=imgurl;
        link.download='img with no bg.jpg';
        link.click();
    }
  return (
    <div className='background-container'>
      <div className='input-container'>
        <h1>Remove Background</h1>
        <h3> Upload an image to get a  background removed img.</h3>
        <form className='form-input'>
            <input
                type='file'
                onChange={(e)=>setFile(e.target.files[0])}
            />
            <button className='removebg' onClick={handleremovebg} disabled={loading}>{loading ? 'Processing':'Add to Remove'}</button>
        </form>
        {imgurl && 
        <div className='removebgimg'>
            <img className='removebg' src={imgurl} alt='removebg'/>
            <div >
            <button className='download' onClick={handleDownload}>Download</button>
            </div>
        </div>
        }
      </div>
    </div>
  )
}

export default Background
