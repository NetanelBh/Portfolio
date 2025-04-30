import jwt from "jsonwebtoken";

const authenticationCheck = (req, res, next) => {    	
	try {
		if (req.headers.authorization) {            
			const token = req.headers.authorization.split(" ")[1];
            // Verify the token with the same hash key used to create it
            jwt.verify(token, process.env.HASH_KEY);
            // If the token is valid, call the next middleware
            next();
		} else {
			res.send({ status: false, data: "No token provided" });
		}
	} catch (error) {
		res.send({ data: "Expired token" });
	}
};

export default authenticationCheck;
