import React, {useState, useEffect} from "react";

const Line = (props) => {
    const [isActive,setIsActive] = useState(false);
    useEffect(() => {
        if(props.isActive === false){
            setIsActive(false);
        }else{
            setIsActive(true);
        }
        
    }, [props.isActive]);
  return (
    <div>
      <svg
        width="128"
        height="2"
        viewBox="0 0 128 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          y1="1"
          x2="128"
          y2="1"
          stroke={isActive?"#EE376B":"#707070"}
          strokeWidth="2"
          strokeDasharray="2 2"
        />
      </svg>
    </div>
  );
};

export default Line;
