import React, { useState, useEffect } from 'react'
import { useGet } from '../hooks/useGet';
import { useSend } from '../hooks/useSend';
import { useAuthContext } from '../hooks/useAuthContext'
import InputField from '../components/InputField'
import "../css/pages/Upload.css"

const Upload = () => {
    // hooks
    const { getAllCategories } = useGet()
    const { createGame } = useSend()

    // global vars
    const { user } = useAuthContext()


    // local vars
    const [ categories, setCategories ] = useState(null)
    const [ statusLabel, setStatusLabel ] = useState("")
    const [ color, setColor ] = useState("")
    const [ error, setError ] = useState("")
    const [ errorList, setErrorList ] = useState([])
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
        author: user._id,
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
            } 
        }
        fetchCategories()
    }, []);

    const handleTextChange = (e) => {
        setUploadData({...uploadData, [e.target.name] : e.target.value})
        let foundIndex = errorList.indexOf(e.target.name)
        if (foundIndex !== -1) {
            errorList.splice(foundIndex, 1)
            setErrorList(errorList)            
        }
    }

    const handleParamChange = (e) => {
        if (e.target.getAttribute('label') === 'number')
            e.target.value = e.target.value.replace(/[a-zA-Z]/g,'')
            if (e.target.value) {
                let foundIndex = errorList.indexOf(e.target.name)
                if (foundIndex !== -1) {
                    errorList.splice(foundIndex, 1)
                    setErrorList(errorList)            
                }
            }
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
        let tempErrorList = []
        console.log(paramData)
        for (let key in uploadData) {
            if (key !== 'categoryID') {
                if (uploadData[key] === '') {
                    missingInput = true
                    status += ' ' + key + ','
                    tempErrorList.push(key)
                }                
            }

        }
        for (let key in paramData) {
            if (paramData[key] === '') {
                missingInput = true
                status += ' ' + key + ','
                tempErrorList.push(key)
            }
        }
        if (uploadData["imageData"].length === 0) {
            missingInput = true
            status += " images"
        }
        if (!missingInput) {
            setError(false)
            setColor("green")
            setStatusLabel(" Success!")
            const categoryData = categories.find(category => category.categoryName === uploadData.categoryName);
            if (categoryData) {
                const response = await createGame({...uploadData, params:paramData, categoryID: categoryData["_id"], quizIDs: categoryData['quizIDs']})
            } else {
                const response = await createGame({...uploadData, params:paramData})
            }
        } else {
            setError(true)
            setErrorList(tempErrorList)
            setColor("red")
            setStatusLabel(status)
        }
    }

    return (
        <div className="upload-container">
            <div className="upload-form">
                <h1 className='upload-heading'>CREATE A QUIZ</h1>
                <h2>Quiz Information:</h2> 
                <InputField label={"text"} text="Category Name:" name="categoryName" onChange={handleTextChange} error={error} errorList={errorList}/>
                <InputField label={"text"} text="Quiz Name:" name="quizName" onChange={handleTextChange} error={error} errorList={errorList}/>
                <InputField label={"text"} text="Quiz Thumbnail:" name="thumbnailUrl" onChange={handleTextChange} error={error} errorList={errorList}/>
                <InputField label={"text"} text="Description:" name="description" onChange={handleTextChange} error={error} errorList={errorList}/>
                <h2>Quiz Parameters:</h2>
                <InputField label={"text"} text="Placeholder Image:" name="placeholderImageUrl" onChange={handleParamChange} defaultValue={paramData["placeholderImageUrl"]} error={error} errorList={errorList}/>
                <InputField label={"number"} text="Reward Points:" name="reward" onChange={handleParamChange} defaultValue={paramData["reward"]} error={error} errorList={errorList}/>
                <InputField label={"number"} text="Penalty Points:" name="penalty" onChange={handleParamChange} defaultValue={paramData["penalty"]} error={error} errorList={errorList}/>
                <InputField label={"number"} text="Max Number of Hints:" name="hintLimit" onChange={handleParamChange} defaultValue={paramData["hintLimit"]} error={error} errorList={errorList}/>
                <InputField label={"number"} text="Play Time:" name="startTime" onChange={handleParamChange} defaultValue={paramData["startTime"]} error={error} errorList={errorList}/>    

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
