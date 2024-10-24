import React,{useState,useEffect} from "react";

const PaymentIcon = (props) => {
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
        width="42"
        height="32"
        viewBox="0 0 42 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 5.33333C0 3.91885 0.553123 2.56229 1.53769 1.5621C2.52226 0.561903 3.85761 0 5.25 0H36.75C38.1424 0 39.4777 0.561903 40.4623 1.5621C41.4469 2.56229 42 3.91885 42 5.33333V26.6667C42 28.0812 41.4469 29.4377 40.4623 30.4379C39.4777 31.4381 38.1424 32 36.75 32H5.25C3.85761 32 2.52226 31.4381 1.53769 30.4379C0.553123 29.4377 0 28.0812 0 26.6667V5.33333ZM5.25 2.66667C4.55381 2.66667 3.88613 2.94762 3.39384 3.44772C2.90156 3.94781 2.625 4.62609 2.625 5.33333V8H39.375V5.33333C39.375 4.62609 39.0984 3.94781 38.6062 3.44772C38.1139 2.94762 37.4462 2.66667 36.75 2.66667H5.25ZM39.375 13.3333H2.625V26.6667C2.625 27.3739 2.90156 28.0522 3.39384 28.5523C3.88613 29.0524 4.55381 29.3333 5.25 29.3333H36.75C37.4462 29.3333 38.1139 29.0524 38.6062 28.5523C39.0984 28.0522 39.375 27.3739 39.375 26.6667V13.3333Z"
          fill={isActive?"#EE376B":"#707070"}
        />
        <path
          d="M5.25 21.3332C5.25 20.6259 5.52656 19.9477 6.01884 19.4476C6.51113 18.9475 7.17881 18.6665 7.875 18.6665H10.5C11.1962 18.6665 11.8639 18.9475 12.3562 19.4476C12.8484 19.9477 13.125 20.6259 13.125 21.3332V23.9998C13.125 24.7071 12.8484 25.3854 12.3562 25.8855C11.8639 26.3856 11.1962 26.6665 10.5 26.6665H7.875C7.17881 26.6665 6.51113 26.3856 6.01884 25.8855C5.52656 25.3854 5.25 24.7071 5.25 23.9998V21.3332Z"
          fill={isActive?"#EE376B":"#707070"}
        />
      </svg>
    </div>
  );
};

export default PaymentIcon;