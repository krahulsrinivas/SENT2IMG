import React, { useState } from 'react';
import Header from './components/header';
import Search from './components/search';
import Upload from './components/upload';
import axios from 'axios';


function App() {
  const [loader, setLoader] = useState();
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [tag,setTag]=useState('');

 const handleSubmit=async ()=>{
   setLoader(true);
  const formData = new FormData();
  formData.append('myImage', file);
  formData.append('tag',tag)
  await axios.post('http://localhost:3000/upload', formData).then(()=>alerts("blue","Caption successfully generated")).catch(err => console.log(err.toString()));
  setImage();
  setFile();
  setTag();
  setLoader(false);
 }
 const alerts = (type,  message)=>{
  const el = document.createElement('div');
  el.className = `ui ${type} message transition visible`
  el.innerHTML = '<i class="close icon"></i>'
  el.innerHTML = el.innerHTML + `<div class="header">${message}</div>`
  el.style.position = 'absolute';
  el.style.left = '5px';
  el.style.top = '20px'
  document.body.appendChild(el);
  setTimeout(() => {
    document.body.removeChild(el);
  }, 2000)
  
};
  return (
    <div style={{ height: "10000px" }} className="ui inverted segment">
    {loader === true ? (
      <div className="ui massive active loader" style={{ position: "absolute", top: "4%", left: "50%",blockSize:"100px" }}></div>
    ) : (
        <center>
        <Header />
        <Upload image={(query,fil) => {
          setFile(fil);
          setImage(query);
        }} />
        {(image === undefined) ? <Search /> : <div>
          <img src={image} alt="uploaded_image" height="400px" width="400px" style={{borderRadius: "15px"}}/>
          <div><h3 style={{margin:"5px"}}>you can add tags to the image like places,occassions....</h3></div>
          <div>
            <input style={{ margin: "10px", padding: "10px" }} className="ui medium input" type="text" placeholder="Add Tags Here" value={tag} onChange={(e)=>setTag(e.target.value)}/>
            <button style={{ margin: "10px" }} className="ui inverted blue button" onClick={()=>handleSubmit()}>Submit</button>
            <button style={{ margin: "10px" }} className="ui inverted red button" onClick={()=>setImage()}>Cancel</button>
          </div>
        </div>}
      </center>)}
    </div>
  );
}

export default App;
