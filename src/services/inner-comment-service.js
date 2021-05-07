
const INNERCOMMENT_URL = "https://web-dev-cyu-server.herokuapp.com/innercomment"
const USER_URL ="https://web-dev-cyu-server.herokuapp.com/user"

const createInnerComment = (innerComment) => 
fetch(`${INNERCOMMENT_URL}`, {
    method: "POST",
    body: JSON.stringify(innerComment),
    headers: {
        'content-type': 'application/json'
    }
})
    .then(response => response.json())

  const findAllInnerComment = (commentId) =>
  fetch(`${INNERCOMMENT_URL}/${commentId}`)
  .then(response =>  response.json())

  const findInnerCommentsByUserId = (userId) =>
  fetch(`${USER_URL}/${userId}/innercomment`)
  .then(response =>  response.json())


  const deleteCommentById = (commentId) => 
  fetch(`${INNERCOMMENT_URL}/${commentId}`, {
      method: "DELETE",
      headers: {
          'content-type': 'application/json'
      }
  })
      .then(response => response.json())

      const updateCommentbyId=(innerCommentId,text)=>
      fetch(`${INNERCOMMENT_URL}/${innerCommentId}/text/${text}`, {
          method: "PUT",
          headers: {
              'content-type': 'application/json'
          }
      })
          .then(response => response.json())

const api={createInnerComment,findAllInnerComment
    ,findInnerCommentsByUserId
    ,deleteCommentById,
    updateCommentbyId}
export default api;