import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import PhotoList from 'components/PhotoList/PhotoList'
import { removePhoto } from 'features/Photo/photoSlice'
import { useHistory } from 'react-router-dom'

function List(props) {
  const  photos = useSelector(state => state.photos)
  const dispatch = useDispatch()
  const history = useHistory()


  const handlePhotoEditClick = (photo) => {
    history.push(`/photos/${photo._id}`)
    
  }

  const handlePhotoRemoveClick = (photo) => {
    console.log("handlePhotoEditClick -> photo", photo)
    dispatch(removePhoto(photo))
  }
  

  return (
    <div>
        < PhotoList photoList={photos} 
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
    </div>
  )
}

List.propTypes = {

}

export default List

