import React, { useState} from "react";

export default function useInput(inputData = {
                                              type:"text",
                                              placeholder:"",
                                              required:false,
                                              className:"",
                                              init: ""
                                            }) {
   
  const {type,placeholder,required,className,init} = inputData;
  
  const [value, setValue] = useState(init);
  

  const input =  <input 
                        type={type} 
                        placeholder={placeholder} 
                        required={required} 
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                        className={className}
                    />

  return [value,input];
}