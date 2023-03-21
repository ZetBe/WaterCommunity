import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { idActions } from '../store/id-slice'
import axios from 'axios'
function CommunityDetail({ post, params }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const likes = state.id.likes
  const hates = state.id.hates
  const likeHandler = (event) => {
    event.preventDefault()
    dispatch(idActions.addLike(likes))
  }
  const hateHandler = (event) => {
    event.preventDefault()
    dispatch(idActions.addHate(hates))
  }
  const deleteHandler = async () => {
    const proceed = window.confirm('진짜 지울거임?')
    const id = params.id
    const select = post.select

    if (proceed) {
      await axios.delete(`http://localhost:3000/${select}/${id}`)
      navigate('/')
    }
  }

  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <time>{post.date}</time>
        <p>{post.contents}</p>
        <div>{likes}</div>
        <div>{hates}</div>
      </article>
      <button onClick={deleteHandler}>삭제</button>
      <div>
        <button onClick={likeHandler}>좋아요</button>
        {post.likes}
        <button onClick={hateHandler}>싫어요</button>
        {post.hates}
      </div>
      <hr></hr>
    </>
  )
}

export default CommunityDetail
