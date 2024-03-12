export const useImage = () => {

    const getAllImages = async (imageIDs) => {
        const queryParams = new URLSearchParams({ imageIDs: imageIDs.join(',') }).toString();
        const response = await fetch(`/api/Images?${queryParams}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json(); // Returns a dictionary of images
    }; //        console.log(await getAllImages(imageIDs))


    const createImages = async (imageData) => {
        const response = await fetch(`/api/Images/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(imageData)
        })
        return await response.json() // returns list of ids
    }

    return { getAllImages, createImages}
}