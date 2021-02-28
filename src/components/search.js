import React, { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Search() {
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState([]);
  const [name, setName] = useState([]);
  const [message, setMessage] = useState("");
  const [val, setVal] = useState("");
  const formChange = async (e) => {
    setLoader(true);
    setImage([]);
    setMessage("");
    await axios.post('http://localhost:3000/search', { "search": search }).then((res) => {
      console.log(res.data);
      setImage(res.data[0]);
      setName(res.data[1]);
      setVal(search);
    }).catch((err) => setMessage("No such image exists in the folder"));
    setLoader(false);
  }
  return (
    <div style={{ margin: "30px" }}>
      <h1 style={{ fontStyle: "italic" }}>or search for an image</h1>
      <div class="ui action  massive input">
        <input type="text" placeholder="Search..." value={search} style={{ paddingLeft: "10px", padding: "5px", paddingRight: "10px", width: "500px" }}
          onChange={(e) => setSearch(e.target.value)}></input>
        <button class="ui icon large button" onClick={(e) => {
          document.getElementById('middle').scrollIntoView();
          formChange(e)
        }}>
          <i class="search icon"></i>
        </button>
      </div>
      {loader === true ? (
        <div className="ui massive active loader" style={{ position: "absolute", top: "5%", left: "50%" }}></div>
      ) : (
          <div></div>
        )}
      {message !== "" ? (
        <h2 style={{ position: "absolute", top: "4%", left: "37%" }}>{message}</h2>
      ) : (
          <div></div>
        )}
      {image.length !== 0 ? (<div>
        <h3 style={{ marginTop: "30px" }}>Results for " {val} "</h3>
        <div style={{ height: "900px", width: "900px", overflow: "auto", margin: "20px", backgroundColor: "#404040" }}>
          {image.map((value, index) => (
            <Popup trigger={<img id="img" src={value} height="400px" width="400px" alt="invalid_image" style={{ borderRadius: "15px", margin: "20px", border: "1px solid white", padding: "10px", boxShadow: "0 0 2px 1px rgba(0, 140, 186, 0.5)" }}
              onMouseEnter={(e) => e.target.style.border = "2px solid lightblue"}
              onMouseLeave={(e) => e.target.style.border = "1px solid white"}
            ></img>} modal nested>{close => (
              <div className="modal" style={{ fontSize: "12px" }}>
                <button className="close" onClick={close} style={{
                  cursor: "pointer",
                  position: "absolute",
                  display: "block",
                  padding: "2px 5px",
                  lineHeight: "20px",
                  right: "-10px",
                  top: "-10px",
                  fontSize: "24px",
                  background: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid #cfcece"
                }}>
                  &times;
                </button>
                <div className="header" style={{
                  borderBottom: "1px solid gray",
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "5px"
                }}>Results for " {val} "</div>
                <div className="content"  >
                  <img src={value} alt="TryAnotherImage" height="300px" width="300px" style={{ borderRadius: "15px", margin: "20px" }}></img>
                  <h1 style={{ position: "absolute", top: "20%", left: "50%", fontStyle: "italic", fontWeight: "bold" }}>If You think this " {val} " is an appropiate caption for this image then click on the submit button and another caption would be stored for the image</h1>
                </div>
                <div className="actions" style={{
                  textAlign: "center"
                }}>
                  <button className="ui blue button" style={{ marginLeft: "20px", marginRight: "20px", margin: "10px", fontSize: "15px" }} onClick={async ()=>{
                    await axios.post('http://localhost:3000/append', { "name":name[index],"caption":val }).then((res) => {
                      close();
                      alert("Successfully updated caption");
                      window.location.reload(true);
                  }).catch(e=>console.log(e));
                  
                  }}> Submit</button>
                  <button
                    className="ui red button" style={{ marginLeft: "20px", marginRight: "20px", margin: "10px" }}
                    onClick={() => {
                      close();
                    }}
                  >
                    Close Popup
                  </button>
                </div>
              </div>
            )}</Popup>

          ))}</div></div>) : <div></div>
      }
      <div id="middle" style={{ position: "absolute", top: "260px" }}></div>
    </div>
  );
}

export default Search;