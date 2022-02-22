import { server } from "../tools"
import axios from "axios"

export const refresh = () => {
    axios.get(`${server}/api/product`, { withCredentials: true })
        .then(res => {
            if (res.data.status === "Success") {
                window.location.reload();
            };
            console.log("An error happened");
        });
};