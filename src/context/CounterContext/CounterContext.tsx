import { createContext, useState } from "react";


interface CounterContextType {
  count:number,
  setcount:React.Dispatch<React.SetStateAction<number>>,
}


// 1. إنشاء الـ Context
export const CounterContext = createContext<CounterContextType>({
    count:0,
    setcount:()=>{}
});
// 2. إنشاء الـ Provider
export default function CounterProvider({ children }: { children: React.ReactNode }) {

    const [count, setcount] = useState(0)
   
  return <CounterContext.Provider value={{count,setcount}}>
      {children}
    </CounterContext.Provider>
  ;
}