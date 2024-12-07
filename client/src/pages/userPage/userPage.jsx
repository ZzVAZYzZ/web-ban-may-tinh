import React from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";

const UserPage = () => {
    const { userId } = useParams();
    return (
        <div>
            {userId}
        </div>
    );
}

export default UserPage;
