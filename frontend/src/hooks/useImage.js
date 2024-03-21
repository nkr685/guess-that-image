export const useImage = () => {

    const getAllImages = async (quizID) => {
        const response = await fetch(`/api/Images?quizID=${quizID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json(); // Returns a dictionary of images
    } //        console.log(await getAllImages(imageIDs))

    return { getAllImages}
}