import React, {useState, useEffect} from "react";

const FinishIcon = (props) => {
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
        width="37"
        height="40"
        viewBox="0 0 37 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34 19.1V11L25 2H4C3.46957 2 2.96086 2.18964 2.58579 2.52721C2.21071 2.86477 2 3.32261 2 3.8V36.2C2 36.6774 2.21071 37.1352 2.58579 37.4728C2.96086 37.8104 3.46957 38 4 38H16"
          fill="#CBFAFF"
        />
        <path
          d="M34 19.1V11L25 2H4C3.46957 2 2.96086 2.18964 2.58579 2.52721C2.21071 2.86477 2 3.32261 2 3.8V36.2C2 36.6774 2.21071 37.1352 2.58579 37.4728C2.96086 37.8104 3.46957 38 4 38H16"
          stroke={isActive?"#EE376B":"#707070"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M20 32.6L26 37.1L35 27.2M24 2V11H34" fill="#CBFAFF" />
        <path
          d="M20 32.6L26 37.1L35 27.2M24 2V11H34"
          stroke={isActive?"#EE376B":"#707070"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default FinishIcon;
