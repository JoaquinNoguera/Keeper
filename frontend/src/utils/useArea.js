import React, { useState } from "react";

export default function useArea({ init, ...otherProps }) {

  const [ value, setValue ] = useState(init);

  const area = <textarea 
                    { ...otherProps } 
                    vale={ value }
                    onChange={e=> setValue(e.target.value)}
                />

  return [ value, area];
}