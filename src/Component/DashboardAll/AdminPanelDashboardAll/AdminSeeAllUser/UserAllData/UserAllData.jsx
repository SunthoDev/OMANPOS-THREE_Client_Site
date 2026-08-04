import React from 'react';
import "./UserAllData.css"

const UserAllData = ({ allUser, HandleAdmin, handleUser, HandleDelete }) => {

    // console.log(allUser)

    let { name,LastName, Password,email,userId,role,date, _id, } = allUser

    return (
        <tr className='UserAllData'>



            <td>
                <h3>{name} {LastName}</h3>
            </td>
            <td>
                <h3>{email}</h3>
            </td>
            <td>
                <h3>{Password}</h3>
            </td>

            <td>
                <h3 className={role === "admin" ? "text-center border-4 border-green-700" : "text-center border-4 border-red-700"}>{role}</h3>
            </td>

            <td>
                <button onClick={() => HandleAdmin(_id)}>Admin</button>
                <br />
                <button onClick={() => handleUser(_id)}>User</button>
            </td>
            <td><button onClick={() => HandleDelete(_id)}>Delete</button></td>

        </tr>
    );
};

export default UserAllData;