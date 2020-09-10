import React, { useState} from "react";

export default function useInput({ init, ...otherProps }) {

  const [ value, setValue ] = useState(init);

  const input = <input 
                    { ...otherProps } 
                    vale={ value }
                    onChange={e=> setValue(e.target.value)}
                />

  return [ value, input];
}