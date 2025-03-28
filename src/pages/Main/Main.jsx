import React, { useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import ListRooms from "../../components/listOfRooms/listRooms";
import { useUser } from "../../http/UserContext/UserContext";
import { observer } from "mobx-react-lite";

const Main = observer(() => {
    const user = useUser();

    // useEffect(() => {
    //     if (!localStorage.getItem('access_token')) {
            
    //     }
    //     user.getProfile();
    // }, [user]);
    return (
        <div>
            <NavBar />
            <ListRooms />
        </div>

    );
});

export default Main;