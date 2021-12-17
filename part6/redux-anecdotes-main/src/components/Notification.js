import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification);
  const style = {
    display: 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification != null ? `You voted for ${notification}`: null}
    </div>
  )
}

export default Notification;