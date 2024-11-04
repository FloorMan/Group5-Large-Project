const { MongoClient } = require("mongodb");

async function loginUser(inData) {
    const uri = "mongodb+srv://root:GroupFive5@cop4331db.jh3zx.mongodb.net/?retryWrites=true&w=majority&appName=COP4331DB"; // Replace with your MongoDB URI
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("steezeeDB");
        const users = database.collection("users");

        // Find user by either username or email and password
        const query = {
            $or: [
                { username: inData.login },
                { email: inData.login }
            ],
            password: inData.password
        };

        const user = await users.findOne(query);
        
        if (user) {
            return returnWithInfo(user.firstName, user.lastName, user._id);
        } else {
            return returnWithError("No Records Found");
        }
    } catch (error) {
        return returnWithError(error.message);
    } finally {
        await client.close();
    }
}

function returnWithInfo(firstName, lastName, id) {
    return JSON.stringify({
        id: id,
        firstName: firstName,
        lastName: lastName,
        error: ""
    });
}

function returnWithError(error) {
    return JSON.stringify({
        id: 0,
        firstName: "",
        lastName: "",
        error: error
    });
}

// Example usage
const inData = { login: "user@example.com", password: "userpassword" };
loginUser(inData).then(response => console.log(response));