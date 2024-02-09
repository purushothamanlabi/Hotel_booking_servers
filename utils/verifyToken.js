


import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "you are not authorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
   
        if (err) {
            return res.status(401).json({ success: false, message: "token is invalid" });
        }
        req.user = user;
        next();
    });
};

export const verifyUserr = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id ) {
            console.log("req.user.id ",req.user.id );
            console.log("req.param.id ",req.params.id );
            next();
        } else {
            return res.status(401).json({ success: false, message: "you are not authenticated" });
        }
    });
};
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("req.user:", req.user);
        console.log("req.params:", req.params);

        if (req.user && req.user.id && req.params.id && req.user.id === req.params.id) {
            console.log("Authentication successful");
            next();
        } else {
            console.log("Authentication failed");
            return res.status(401).json({ success: false, message: "You are not authenticated" });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({ success: false, message: "you are not authorized" });
        }
    });
};














