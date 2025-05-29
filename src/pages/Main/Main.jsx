import React, { useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import ListRooms from "../../components/listOfRooms/listGyms";
import { observer } from "mobx-react-lite";

const Main = observer(() => {
    return (
        <div>
            <NavBar />
            <ListRooms />
        </div>

    );
});

export default Main;