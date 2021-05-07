const COMMENT_URL = "https://web-dev-cyu-server.herokuapp.com/comment"
const USER_URL ="https://web-dev-cyu-server.herokuapp.com/user"
const createComment = ( comment) => 
    fetch(`${COMMENT_URL}`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

        
        const findAllComment = (productId) =>
        fetch(`${COMMENT_URL}/${productId}`)
        .then(response =>  response.json())

        const findCommentsByUserId=(userId)=>
        fetch(`${USER_URL}/${userId}/comment`)
        .then(response =>  response.json())

        const deleteCommentById = (commentId) => 
    fetch(`${COMMENT_URL}/${commentId}`, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

        const updateCommentbyId=(commentId,text)=>
        fetch(`${COMMENT_URL}/${commentId}/text/${text}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())

        

const api={createComment,findAllComment,findCommentsByUserId,deleteCommentById,updateCommentbyId}
export default api;