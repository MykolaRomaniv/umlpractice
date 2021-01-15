/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
import firebase from 'firebase/app'
import 'firebase/database'

// TODO adapt for this app

// [START rtdb_write_new_user]
export function writeUserData(
  userId: string,
  name: string,
  email: string,
  imageUrl: string,
) {
  firebase.database().ref(`users/${userId}`).set({
    username: name,
    email,
    profile_picture: imageUrl,
  })
}
// [END rtdb_write_new_user]

export function writeUserDataWithCompletion(
  userId: string | number,
  name: string,
  email: string,
  imageUrl: string,
) {
  // [START rtdb_write_new_user_completion]
  firebase
    .database()
    .ref(`users/${userId}`)
    .set(
      {
        username: name,
        email,
        profile_picture: imageUrl,
      },
      // eslint-disable-next-line func-names
      function (error) {
        if (error) {
          // The write failed...
        } else {
          // Data saved successfully!
        }
      },
    )
  // [START rtdb_write_new_user_completion]
}

export function socialListenStarCount() {
  const postElement = document.querySelector('#post')
  const postId = '1234'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function updateStarCount(_a: any, _b: any) {
    // ...
  }

  // [START rtdb_social_listen_star_count]
  const starCountRef = firebase.database().ref(`posts/${postId}/starCount`)
  starCountRef.on('value', (snapshot) => {
    const data = snapshot.val()
    updateStarCount(postElement, data)
  })
  // [END rtdb_social_listen_star_count]
}

export function socialSingleValueRead() {
  // [START rtdb_social_single_value_read]
  const userId = firebase.auth().currentUser?.uid
  return firebase
    .database()
    .ref(`/users/${userId}`)
    .once('value')
    .then((snapshot) => {
      const username =
        (snapshot.val() && snapshot.val().username) || 'Anonymous'
      // eslint-disable-next-line no-console
      console.log(username)
    })
  // [END rtdb_social_single_value_read]
}

// [START rtdb_social_write_fan_out]
export function writeNewPost(
  uid: string,
  username: string,
  picture: string,
  title: string,
  body: string,
) {
  // A post entry.
  const postData = {
    author: username,
    uid,
    body,
    title,
    starCount: 0,
    authorPic: picture,
  }

  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates: any = {}
  updates[`/posts/${newPostKey}`] = postData
  updates[`/user-posts/${uid}/${newPostKey}`] = postData

  return firebase.database().ref().update(updates)
}
// [END rtdb_social_write_fan_out]

export function socialCompletionCallback() {
  const name = 'Mykola'
  const userId = '123'
  const email = 'test@example.com'
  const imageUrl = 'https://example.com/image.png'

  // [START rtdb_social_completion_callback]
  firebase
    .database()
    .ref(`users/${userId}`)
    .set(
      {
        username: name,
        email,
        profile_picture: imageUrl,
      },
      (error) => {
        if (error) {
          // The write failed...
        } else {
          // Data saved successfully!
        }
      },
    )
  // [END rtdb_social_completion_callback]
}

/**
 * @param {firebase.database.Reference} postRef
 * @param {string} uid
 */
// [START rtdb_social_star_transaction]
export function toggleStar(postRef: firebase.database.Reference, uid: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postRef.transaction((post: any) => {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--
        post.stars[uid] = null
      } else {
        post.starCount++
        if (!post.stars) {
          post.stars = {}
        }
        post.stars[uid] = true
      }
    }
    return post
  })
}
// [END rtdb_social_star_transaction]

export default firebase
