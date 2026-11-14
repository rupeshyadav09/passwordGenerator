import { useState,useEffect,useRef } from 'react'
import './App.css'
import { useCallback } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [Num, setNum] = useState(false)
  const [Char, setChar] = useState(false)
  const [Password, setPassword] = useState("")
  
   const passwordRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(Num) str += "0123456789"
    if(Char) str += "!~@#$%^&*()_+{}"

    for(let i=0; i< length; i++){
      let charr = Math.floor(Math.random() * str.length + 1)
          
       pass += str.charAt(charr);
    }
     setPassword(pass)

  },[length,Num,Char,setPassword])

  const copypassword = useCallback(() => {
     passwordRef.current?.select();
     passwordRef.current?.setSelectionRange(0,99);
     window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(() => {
    passwordgenerator()
  },[length,Num,Char,passwordgenerator])

  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-8 my-16 text-orange-500 bg-gray-600'>
        <h2 className='text-4xl text-center text-white'>Password Generator</h2>

         <div className='flex-shadow rounded-lg overflow-hidden mb-4 py-2'>
            <input
            type='text'
            value={Password}
            className='outline-none w-full px-3 py-1 bg-white'
            placeholder='password'
            readOnly
            ref={passwordRef}
            
            /> 
            <button 
             onClick={copypassword}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '>
              Copy
              </button> 
         </div>

         <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
               <input
               type='range'
               min={6}
               max={100}
               value={length}
               className='cursor-pointer'
               onChange={(e) =>{setlength(e.target.value)}}
               />
               <label>Length:{length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input 
             type='checkbox'
             defaultChecked ={Num}
             id='numberInput'
             onChange={() => {
               setNum((prev) => !prev);
             }}
              />
              <lebel htmlFor = "numberInput">Numbers</lebel>
          </div>

          <div className='flex item-center gap-x-1'>
             <input 
             type='checkbox'
             defaultChecked ={Char}
             id='charInput'
             onChange={() => {
               setChar((prev) => !prev);
             }}
              />
              <lebel htmlFor = "charInput">Charactors</lebel>
          </div>
         </div>
      </div>
    </>
  )
}

export default App
