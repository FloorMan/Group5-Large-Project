


const { MongoClient } = require("mongodb")

async function registerUser(inData) {
    const uri = "mongodb+srv://root:GroupFive5@cop4331db.jh3zx.mongodb.net/?retryWrites=true&w=majority&appName=COP4331DB";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("steezeeDB");
        const users = database.collection("users");

        // ------> Check if username or email already exists <------
        const query = {
            $or: [
                { username: inData.username },
                { email: inData.email }
            ]
        };
        const inDatabase = await users.find(query).toArray();

        // ------> Return with error if username or email already exists <------
        if (inDatabase.length) {
            if (inDatabase[0].username === inData.username) {
                return returnWithError(inData.email, inData.username, "Email already exists");
            } else if (inDatabase[0].email === inData.email){
                return returnWithError(inData.email, inData.username, "Username already exists");
            }
        }

        // ------> We can insert <------
        const result = await users.insertOne(inData);
        return returnWithInfo(inData, result.insertedId, "Successfully registered");

    } catch (error) {
        return returnWithError(inData.email, inData.username, error.message);
    } finally {
        await client.close();
    }
}


function returnWithError(email, username, error) {
    return JSON.stringify({
        id: 0,
        firstName: "",
        lastName: "",
        error: error
    });
}


function returnWithInfo(inData, id, message) {
    return JSON.stringify({
        id: id,
        firstName: inData.firstName,
        lastName: inData.lastName,
        username: inData.username,
        email: inData.email,
        password: inData.password,
        error: message
    });
}


// Example of correct use
//const inData = { id: "6748271", firstName: "John", lastName: "Doe", username: "johndoe", email: "test@gmail.com", password: "password" };
//registerUser(inData).then(response => console.log(response));
module.exports = { registerUser };