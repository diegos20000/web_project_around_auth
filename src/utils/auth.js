export const signup = async (email, password) => {
    const response = await fetch("api/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    });
    return response.json();
};

export const signin = async (email, password) => {
    const response = await fetch("api/signin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    });
    return response.json();
};