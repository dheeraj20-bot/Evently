'use server'
import { CreateCategoryParams } from "@/types"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model copy"
import { handleError } from "../utils"

export  const createcategory = async({categoryName}:CreateCategoryParams)=>{
        try {
            await connectToDatabase()
            const newCategory = await Category.create({name:categoryName})
            
            return JSON.parse(JSON.stringify(newCategory));
        } catch (error) {
             handleError(error)
        }
}

export  const getAllCategories = async()=>{
        try {
            await connectToDatabase()
            const categories = await Category.find()
            
            return JSON.parse(JSON.stringify(categories));
        } catch (error) {
             handleError(error)
        }
}