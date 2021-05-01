import React from "react";
import { Card, CardBody } from "reactstrap";


const User = ({ user }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2"> User: {user.firstname}</p>
            <CardBody>
                <p to={`/user/user${user.id}`}>
                    {user.firstname}
                </p>
                <p>
                    <strong>{user.fullName}</strong>
                </p>
                User Name:<p>{user.displayName}</p>

            </CardBody>
        </Card>
    );
};

export default User;
