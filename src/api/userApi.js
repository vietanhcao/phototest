import firebase from 'firebase'

const userApi = {
  getMe: () => {
    return new Promise((resolve, reject) => {
      reject(new Error('eeeee'))

      // setTimeout(() => {
      //   const currentUser = firebase.auth().currentUser
      //   resolve({id: currentUser.uid, name: currentUser.displayName, email: currentUser.email})
      // }, 500);
    })
  }
}




export default userApi