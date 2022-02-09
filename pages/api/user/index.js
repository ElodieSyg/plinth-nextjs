const withSession = async (req, res) => {
    console.log("req in api/user", req)
    const user = req.session.get('user');
    console.log("user in api/user", user)
    if (user) {
        res.json({
            isLoggedIn: true,
            ...user,
        });
    } else {
        res.json({
            isLoggedIn: false,
        });
    }
}

export default withSession;