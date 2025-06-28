"use client"
import React, {createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

interface Events{
    _id:string,
    title:string,
    privacy:string,
    description:string,
    date:string,
    location:string,
    createdBy:CreatedBy,
    createdAt:string
}
interface AddEvent{
    description:string,
    title:string,
    privacy:string,
    date:Date,
    location:string,
}
interface CreatedBy {
    name:string,
}
interface Tasks{
    _id:string,
    description:string,
    title:string,
    status:string,
    eventId:{
        title:string,
    };
    assignedTo:{
        name:string,
    }
    createdAt:string
}
interface addTask{
    title:string,
    description:string,
    status:string,
}


interface ManageProviderProps{
    children:React.ReactNode
}
interface ManageContextProps {
    events:Events[],
    setRefresh:Dispatch<SetStateAction<number>>;
    refreshCount:number
    addEvent:(envent:AddEvent)=>void,
    removeEvent:(eventId:string)=>void,
}
export const ManageEventVerseContext =createContext<ManageContextProps>({
    events:[],
    refreshCount:0,
    setRefresh:()=>{},
    removeEvent:(eventIdLstring)=>{},
    addEvent:(envent:AddEvent)=>{}
})

const ManageContextProvider: React.FC<ManageProviderProps> = ({children})=>{
    const[events,setEvents]=useState<Events[]>([]);
    const[tasks,setTasks]=useState<Tasks[]>([]);
    const[refreshCount,setRefresh]=useState<number>(0);
    const[Role,setRole]=useState<string|null>(null);
    const[Token,setToken]=useState<string|null>(null);
    const[UserId,setUserId]=useState<string|null>(null);


useEffect(()=>{
const token =localStorage.getItem('EventVerseToken');
const role =localStorage.getItem('EventVerseRole');
const userId=localStorage.getItem('EventVerseId');
setToken(token);
setRole(role);
setUserId(userId);
},[])
useEffect(()=>{ 
    if(!Token || !UserId ||!Role){
        return console.log("We Cant move forward untill  token and other data are fetched ")
    }
    
    const fetchEvents = async()=>{
            try{
            let url:string=" ";
            if(Role=='Organizer'){
                url =`${process.env.NEXT_PUBLIC_API_URL}/events/GetEventsBelongeToOrganizer`
            }
            else{
                url =`${process.env.NEXT_PUBLIC_API_URL}/events`
            }
    
            const res =await fetch(url,{
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${Token}`,
                }
            })
            if(res.ok){
                const {data} =await res.json();
                console.log(data)
                setEvents(data);
            }
            else{
                console.log("there is an error while fetching events")
            }
        }catch(error){
            console.log(error)
        }
        }

        fetchEvents();

        
},[refreshCount,Token,UserId,Role])
    const removeEvent =async(eventId:string)=>{
        try{
            const res =await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`,{
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${Token}`,
                }
            })
            if(res.ok){
                alert("Deleted Succuessfully")
                setEvents((data)=>data.filter(ev=>ev._id !==eventId));
            }
            else{
                console.log("there is an error while deleting event")
            }
        }catch(error){
                        console.log(error)
        }
    }
    const addEvent =async(event:AddEvent)=>{
        try{
            const res =await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/createEvent`,{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${Token}`,
                },
                body:JSON.stringify(event)
            })
            if(res.ok){
                alert("Added Succuessfully")
            
            }
            else{
                console.log("there is an error while Adding Event")
            }
        }catch(error){
                        console.log(error)
        }
    }
    return(
        <ManageEventVerseContext.Provider 
        value={{
            events,
            refreshCount,
            setRefresh,
            removeEvent,
            addEvent,
        }}
        >
            {children}
        </ManageEventVerseContext.Provider>
    )

}
export default ManageContextProvider;