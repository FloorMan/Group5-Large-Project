// testRegister.js
const { registerUser } = require('./register.js');

async function testRegisterUser() {
    const sampleData = {
        firstName: "Diego",
        lastName: "Aguirre",
        email: "aguirre.diego@example.com",
        username: "diaguirre",
        password: "aguirreD1102"
    };

    try {
        const result = await registerUser(sampleData);
        console.log("Test Result:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

testRegisterUser();