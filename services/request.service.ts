const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const uploadRequest = async (
    file: File | undefined
): Promise<string | undefined> => {
    try {
        const formData: FormData = new FormData();
        file && formData.append("image", file);

        const response: Response = await fetch(`${apiUrl}/api/upload`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        if (data && data.data && data.data.url) {
            return data.data.url;
        } else {
            console.error("Invalid response format from server:", data);
            return undefined;
        }
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return undefined;
    }
};