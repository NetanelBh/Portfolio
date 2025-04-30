import axios from "axios";

const getAllMembers = () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    
    return axios.get(url);
};

export default getAllMembers;
