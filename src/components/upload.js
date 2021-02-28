import React, { useRef } from 'react';

function Upload({ ...props }) {
    const {image}=props;
    const imageInput = useRef();
    const imageChange = async (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                image(reader.result,e.target.files[0]);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    return (
        <div style={{ margin: "20px" }}>
            <button className="ui inverted black button" onClick={() =>{
                imageInput.current.value = ''; 
                imageInput.current.click();
            }}>
                Upload an image
            </button>
            <input type="file" placeholder="Image Uploader" ref={imageInput} style={{ color: "transparent" }} title=""  onChange={async (e) => imageChange(e)} hidden />
        </div>
    );
}

export default Upload;