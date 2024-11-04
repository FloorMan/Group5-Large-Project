// testRegister.js
const { loginUser } = require('./login.js');

async function testLogin() {
    const sampleData = {
        login: "JohnDoe",
        password: "Password#1"
    };

    try {
        const result = await testLogin(sampleData);
        console.log("Test Result:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

testLogin();