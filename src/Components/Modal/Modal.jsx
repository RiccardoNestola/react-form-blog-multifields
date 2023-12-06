
import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, onAddPost, onSave, existingPost }) => {

    const [newPost, setNewPost] = useState({
        title: '',
        image: '',
        content: '',
        tags: [],
        published: true,
    });

    const Change = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setNewPost({ ...newPost, [name]: checked });
        } else {
            setNewPost({ ...newPost, [name]: value });
        }
    };

    const Submit = (e) => {
        e.preventDefault();
        if (!newPost.title || !newPost.image || !newPost.content || !newPost.tags) {
            alert('Compila tutti i campi');
            return;
        }
        const tagsArray = newPost.tags.split(',').map(tag => tag.trim());
        const postData = { ...newPost, tags: tagsArray };

        if (existingPost) {
            onSave(existingPost.id, postData);
        } else {
            onAddPost(postData);
        }

        onClose();
    };


    useEffect(() => {
        /* console.log(existingPost); */
        if (existingPost) {
            setNewPost({
                title: existingPost.title || '',
                image: existingPost.image || '',
                content: existingPost.content || '',
                tags: Array.isArray(existingPost.tags) ? existingPost.tags.join(', ') : '',
                published: existingPost.hasOwnProperty('published') ? existingPost.published : true,
            });
        } else {
            /*  console.log(existingPost); */
            setNewPost({
                title: '',
                image: '',
                content: '',
                tags: '',
                published: true,
            });
        }
    }, [existingPost]);





    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <button className="mb-4 text-gray-600 hover:text-gray-800" onClick={onClose}>Chiudi</button>
                <form onSubmit={Submit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titolo</label>
                        <input type="text" id="title" name="title" value={newPost.title} onChange={Change} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500" />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Immagine URL</label>
                        <input type="text" id="image" name="image" value={newPost.image} onChange={Change} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500" />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenuto</label>
                        <textarea id="content" name="content" value={newPost.content} onChange={Change} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500" rows="3"></textarea>
                    </div>

                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                        <p className="text-sm text-gray-500 mt-2">Separare i tags con una virgola, puoi aggiungere solo questi:</p>
                        <li className="text-sm text-gray-500 mt-2">html</li>
                        <li className="text-sm text-gray-500">css</li>
                        <li className="text-sm text-gray-500">js</li>
                        <li className="text-sm text-gray-500 mb-2">php</li>
                        <input type="text" id="tags" name="tags" value={newPost.tags} onChange={Change} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500" />
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" id="published" name="published" checked={newPost.published} onChange={Change} className="h-4 w-4 accent-gray-500 focus:ring-gray-500 border-gray-300 rounded" />
                        <label htmlFor="published" className="ml-2 block text-sm text-gray-900">Pubblicato</label>
                    </div>

                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            {existingPost ? 'Salva le modifiche' : 'Aggiungi Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;