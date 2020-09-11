import React, { useState} from "react";

export default function useTextArea(inputData = {
                                                  className: "",
                                                  placeholder:"",
                                                  init:""  
                                                }) {
  
  const {className, placeholder,init} = inputData;

  const [value, setValue] = useState(init);
  

  const textArea =  <textarea 
                        value={value}
                        placeholder={placeholder}
                        onChange={e=> setValue(e.target.value)}
                        className={className}
                    />

  return [value,textArea];
}