import React, { useState } from 'react';
import Carousel from './Components/Carousel/Carousel'
import images from './data/images'
import Header from './Components/Header/Header'
import Modal from './Components/Modal/Modal'
import CardList from './Components/Cards/CardList'
import Footer from './Components/Footer/Footer'
import oldPosts from './data/posts';


function App() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState(oldPosts);
  const [postToEdit, setPostToEdit] = useState(null);


  const addPost = (newPost) => {
    const uniqueId = crypto.randomUUID();
    const postToAdd = { ...newPost, id: uniqueId };
    setPosts([...posts, postToAdd]);
  };


  const deletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);

  };


  const openEditModal = (post) => {
    /*  console.log(post); */
    setPostToEdit(post);
    setModalOpen(true);
  };

  const editPost = (postId, updatedData) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, ...updatedData };
      }
      return post;
    });
    setPosts(updatedPosts);
  };


  return (
    <>
      <Header onOpenModal={() => setModalOpen(true)} />

      <main>
        <Carousel images={images} />

        <Modal isOpen={isModalOpen} onClose={() => { setModalOpen(false); setPostToEdit(null); }} onAddPost={addPost} onSave={editPost} existingPost={postToEdit} />


        <CardList posts={posts} onDeletePost={deletePost} onEditPost={openEditModal} />
      </main>

      <Footer />

    </>
  )
}

export default App
