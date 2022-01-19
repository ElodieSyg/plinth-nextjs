import Router from "next/router";

const redirect = (path) => {
    Router.push(path);
};

export default redirect;