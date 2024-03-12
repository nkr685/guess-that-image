import { useState } from "react"

export const useCategory= () => {

    const getAllCategories = async()=> {
        const response = await fetch(`api/Categories`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
        return await response.json()
    }

    const createCategory = async (categoryData) => {
        const response = await fetch(`/api/Categories/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(categoryData)
        })
        return await response.json()
    }

    const updateCategory = async (categoryData) => {
        const response = await fetch(`/api/Categories/${categoryData._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(categoryData)
        })
        return await response.json()
    }
    return { createCategory, getAllCategories, updateCategory}
}