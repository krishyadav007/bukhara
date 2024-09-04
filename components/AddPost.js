"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddPost() {
    const { data: session } = useSession();
    const [showForm, setShowForm] = useState(false);
    const [postItems, setPostItems] = useState([
        { text: "", bgImageUrl: "" }
    ]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function handleButtonClick() {
        setShowForm(true);
    }

    function handlePostItemChange(index, field, value) {
        const newPostItems = [...postItems];
        newPostItems[index][field] = value;
        setPostItems(newPostItems);
    }

    function handleAddPostItem() {
        setPostItems([...postItems, { text: "", bgImageUrl: "" }]);
    }

    function handleRemovePostItem(index) {
        const newPostItems = postItems.filter((_, i) => i !== index);
        setPostItems(newPostItems);
    }

    const addPost = async (e) => {
        e.preventDefault();

        if (postItems.some(item => !item.text || !item.bgImageUrl)) {
            alert("Please enter text and image URL for all items.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postItems,
                    userId: session?.user?.id,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setMessage(data.message || 'Post created successfully!');
                setPostItems([{ text: "", bgImageUrl: "" }]);
                setShowForm(false);
            } else {
                const errorData = await res.json();
                setMessage(`Error: ${errorData.error}`);
            }
        } catch (error) {
            setMessage('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            {!showForm ? (
                <button
                    className="bg-[#5C4033] py-2 px-12 rounded-md mb-4 text-white"
                    onClick={handleButtonClick}
                >
                    Add Post
                </button>
            ) : (
                <div className="w-full p-8">
                    {postItems.map((item, index) => (
                        <div key={index} className="mb-8">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Text {index + 1}:</label>
                                <textarea
                                    value={item.text}
                                    onChange={(e) => handlePostItemChange(index, "text", e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    rows="4"
                                    placeholder="Enter your text here..."
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Background Image URL {index + 1}:</label>
                                <input
                                    type="text"
                                    value={item.bgImageUrl}
                                    onChange={(e) => handlePostItemChange(index, "bgImageUrl", e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Enter background image URL..."
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Font {index + 1}:</label>
                                <select
                                    value={item.font}
                                    onChange={(e) => handlePostItemChange(index, "font", e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="Arial">Arial</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Tahoma">Tahoma</option>
                                    <option value="Trebuchet MS">Trebuchet MS</option>
                                </select>
                            </div> */}
                            {postItems.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemovePostItem(index)}
                                    className="text-red-500 mb-4"
                                >
                                    Remove this item
                                </button>
                            )}
                            <hr />
                        </div>
                    ))}

                    <button
                        className="bg-[#5C4033] py-2 px-12 rounded-md text-white mb-2 mr-4"
                        onClick={addPost}
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Upload Post'}
                    </button>
                    <button
                        type="button"
                        onClick={handleAddPostItem}
                        className="mb-4 bg-[#5C4033] py-2 text-white px-12 rounded-md"
                    >
                        Add Another Image
                    </button>
                </div>
            )}
            {message && <p className={`mt-4 ${message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        </div>
    );
}
