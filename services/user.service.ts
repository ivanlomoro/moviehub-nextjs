export const createUser = async (userObject: {}) => {
    const url = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${url}/user`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(userObject)
        });
        const dataFetched = await response.json();
        return { success: true, user: dataFetched };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error };
    }
}
