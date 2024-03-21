import { useState } from "react"

export const useCategory= () => {

    const getAllCategories = async()=> {
        const response = await fetch(`api/Categories`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
        return await response.json()
    }

    return { getAllCategories }
}