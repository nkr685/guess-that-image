import React, { useState, useEffect } from 'react'
import { useCategory } from '../hooks/useCategory'
import { useUpload } from '../hooks/useUpload'
import { useAuthContext } from '../hooks/useAuthContext'
import InputField from '../components/InputField'

const Upload = () => {
    // global vars
    const { user } = useAuthContext()

    // hooks
    const { getAllCategories } = useCategory()
    const { uploadNewQuiz } = useUpload()

    // local vars
    const [ categories, setCategories ] = useState(null)
    const [ statusLabel, setStatusLabel ] = useState("")
    const [ color, setColor ] = useState("")
    const [ paramData, setParamData ] = useState({
        placeholderImageUrl : "https://upload.wikimedia.org/wikipedia/commons/2/25/Icon-round-Question_mark.jpg",
        placeholderImageName : "Placeholder",
        reward : 300,
        penalty : 100,
        hintLimit : 3,
        startTime : 30
    })
    const [ uploadData, setUploadData ] = useState({
        categoryID : '',
        categoryName : '',
        quizName : '',
        thumbnailUrl : '',
        author: user.userID,
        description: '',
        imageData : [],
        quizIDs : [],
        params : paramData
    })

    useEffect(() => {
        const fetchCategories = async () => {
            const json = await getAllCategories()
            if (json) {
                setCategories(json)
                console.log(json)
                // setUploadData({...uploadData})
            } 
        }
        fetchCategories()
    }, []);

    const handleTextChange = (e) => {
        setUploadData({...uploadData, [e.target.name] : e.target.value})
    }

    const handleParamChange = (e) => {
        if (e.target.getAttribute('label') === 'number')
            e.target.value = e.target.value.replace(/[a-zA-Z]/g,'')
        setParamData({...paramData, [e.target.name] : e.target.value})
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            try {
                const fileContent = await file.text()
                const jsonData = JSON.parse(fileContent)
                setUploadData({...uploadData, ["imageData"] : jsonData})

            } catch (error) {
                console.error('Error reading file:', error)
            }
        }
    }

    const handleUpload = async () => {
        let missingInput = false
        let status = " Missing "
        for (let key in uploadData) {
            if (key !== 'categoryID') {
                if (uploadData[key] === '') {
                    missingInput = true
                    status += ' ' + key + ','
                }                
            }

        }
        for (let key in paramData) {
            if (uploadData[key] === '') {
                missingInput = true
                status += ' ' + key + ','
            }
        }
        if (uploadData["imageData"].length === 0) {
            missingInput = true
            status += " images"
        }

        if (!missingInput) {
            setColor("green")
            setStatusLabel(" Success!")
            const categoryData = categories.find(category => category.categoryName === uploadData.categoryName);
            if (categoryData) {
                const response = await uploadNewQuiz({...uploadData, params:paramData, categoryID: categoryData["_id"], quizIDs: categoryData['quizIDs']})
            } else {
                const response = await uploadNewQuiz({...uploadData, params:paramData})
            }
        } else {
            setColor("red")
            setStatusLabel(status)
        }
    }

    return (
        <div className="upload-container">
            <div className="upload-form">
                <h1 className='upload-heading'>CREATE A QUIZ</h1>
                <InputField label={"text"} text="Category Name:" name="categoryName" onChange={handleTextChange}/>
                <InputField label={"text"} text="Quiz Name:" name="quizName" onChange={handleTextChange}/>
                <InputField label={"text"} text="Quiz Thumbnail:" name="thumbnailUrl" onChange={handleTextChange}/>
                <InputField label={"text"} text="Description:" name="description" onChange={handleTextChange}/>

                <InputField label={"text"} text="Placeholder Image:" name="placeholderImageUrl" onChange={handleParamChange} defaultValue={paramData["placeholderImageUrl"]}/>
                <InputField label={"number"} text="Reward Points:" name="reward" onChange={handleParamChange} defaultValue={paramData["reward"]}/>
                <InputField label={"number"} text="Penalty Points:" name="penalty" onChange={handleParamChange} defaultValue={paramData["penalty"]}/>
                <InputField label={"number"} text="Max Number of Hints:" name="hintLimit" onChange={handleParamChange} defaultValue={paramData["hintLimit"]}/>
                <InputField label={"number"} text="Play Time:" name="startTime" onChange={handleParamChange} defaultValue={paramData["startTime"]}/>    

                <div>
                    <input className="upload-file-input" type="file" id="fileInput" onChange={handleFileChange}  />
                </div>

                <button onClick={handleUpload} className="upload-button">Create Quiz</button>
                <label style={{ color: `${color}` }}>{statusLabel}</label>
            </div>
        </div>
    );
};

export default Upload;
