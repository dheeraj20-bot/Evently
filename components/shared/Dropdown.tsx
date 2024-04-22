'use client'
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model copy";
import { startTransition, useEffect, useState } from "react";
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,
  } from "@/components/ui/alert-dialog" 
import { Input } from "../ui/input";
import { createcategory, getAllCategories } from "@/lib/actions/category.action";

type DropdownProps = {
    value?:string;
    onChanegHanlder?:()=>void
}

const Dropdown = ({value,onChanegHanlder}:DropdownProps) => {
   const [categories, setCategories] = useState<ICategory[]>([])
   const [newCategory, setNewCategory] = useState('')

   const handleAddCategory = ()=>{
       createcategory({
        categoryName:newCategory.trim()
       })
       .then((category)=>{
        setCategories((prev)=>[...prev,category])
       })
   }

   useEffect(()=>{
    const getcategories = async()=>{
      const categoriesList = await getAllCategories();
      categoriesList && setCategories(categoriesList as ICategory[])
    }
    getcategories()
    
   },[])

  return (
    <Select onValueChange={onChanegHanlder} defaultValue={value}>
    <SelectTrigger className="select-field">
      <SelectValue placeholder="Category" />
    </SelectTrigger>
    <SelectContent>
      {categories.length>0 && categories.map((category)=>(
         <SelectItem key={category._id} 
         className="select-item p-regular-14"
         value={category._id}>{category.name}</SelectItem>
      ))}

   <AlertDialog>
    <AlertDialogTrigger className="p-medium-14 flex w-full
     rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new category</AlertDialogTrigger>
     <AlertDialogContent className="bg-white">
      <AlertDialogHeader>
      <AlertDialogTitle>New Category</AlertDialogTitle>
      <AlertDialogDescription>
       <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e)=>setNewCategory(e.target.value)}/>
      </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>startTransition(handleAddCategory)} >Add</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
    </SelectContent>
  </Select>
  )
}

export default Dropdown