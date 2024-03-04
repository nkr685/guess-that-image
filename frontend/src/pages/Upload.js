import React, { useState } from 'react';

const Upload = () => {
    const [categoryData, setCategoryData] = useState({
            categoryName: '',
            datasetName: '',
            quizName: '',
        });
    
    const [jsonFileData, setJsonFileData] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prevData) => ({...prevData, [name]: value,}));
    };
    
    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            try {
                const fileContent = await file.text();      
                const jsonData = JSON.parse(fileContent);
                setJsonFileData(jsonData)
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }

    }
    
    const handleUpload = () => {
        console.log('File created with data:', categoryData);
    };
    
      return (
        <div>
        <div>
            <label>Category Name:</label>
            <input
            type="text"
            name="categoryName"
            value={categoryData.categoryName}
            onChange={handleInputChange}
            />
        </div>
        <div>
            <label>Dataset Name:</label>
            <input
            type="text"
            name="datasetName"
            value={categoryData.datasetName}
            onChange={handleInputChange}
            />
        </div>
        <div>
            <label>Quiz Name:</label>
            <input
            type="text"
            name="quizName"
            value={categoryData.quizName}
            onChange={handleInputChange}
            />
        </div>
        <div>
            <label>Choose File:</label>
            <input type="file" onChange={handleFileChange} />
        </div>
        <div>
            <button onClick={handleUpload}>Send to DB</button>
        </div>
        <div>
            <h3>Form Data:</h3>
            <pre>{JSON.stringify(categoryData, null, 2)}</pre>
        </div>
        <div>
            <h3>Form Data:</h3>
            <pre>{JSON.stringify(jsonFileData ? jsonFileData : [], null, 2)}</pre>
        </div>
        </div>
    );
};
    

export default Upload;