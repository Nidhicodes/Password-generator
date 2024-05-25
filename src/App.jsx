import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [num, setnum] = useState(false)
  const [char, setchar] = useState(false)
  const [pswd, setpswd] = useState("")
  const pswdref=useRef(null)
  
  const pswdgen = useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(num) str+="0123456789"
  if(char) str += ';,./[]\\"';
  for(let i=1;i<=length;i++){
    let charac=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(charac)
  }
  setpswd(pass)

  },[length,num,char,setpswd])
  const copyPasswordToClip=useCallback(()=>{
    pswdref.current?.select();
    window.navigator.clipboard.writeText(pswd)
  },
  [pswd])

  useEffect(()=>{pswdgen()},[length,num,char,setpswd])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type="text"
        value={pswd}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={pswdref}
        />
        <buttton 
        onClick={copyPasswordToClip}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</buttton>     

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input 
          type="checkbox" 
          defaultChecked={num}
          id="numberInput"
          onChange={()=>{setnum((prev)=>!prev);
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input 
          type="checkbox" 
          defaultChecked={char}
          id="characterInput"
          onChange={()=>{setchar((prev)=>!prev);
          }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
