import React, { useState, useEffect, useRef } from "react";

export const FreelancerChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId")?.trim();
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch freelancer conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/conversations/freelancer`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setConversations(data);
        if (data.length > 0) setSelectedConversation(data[0]);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };
    fetchConversations();
  }, [token]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/messages/${selectedConversation._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [selectedConversation, token]);

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversationId: selectedConversation._id,
          text: newMessage,
        }),
      });
      const data = await res.json();
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-60px)] mt-24 bg-gray-100">
      {/* Sidebar */}
      <div className="lg:w-1/3 w-full border-r bg-white overflow-y-auto shadow-md">
        <h2 className="text-xl font-semibold p-4 border-b bg-gray-100 sticky top-0 z-10">
          💬 My Chats
        </h2>

        {conversations.length === 0 ? (
          <p className="p-4 text-gray-500">No conversations yet.</p>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv._id}
              onClick={() => setSelectedConversation(conv)}
              className={`p-4 border-b cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${
                selectedConversation?._id === conv._id
                  ? "bg-orange-100 border-l-4 border-orange-500 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              Chat with {conv.clientName || conv._id.slice(-5)}
            </div>
          ))
        )}
      </div>

      {/* Chat Box */}
      <div className="lg:w-2/3 w-full flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b bg-white shadow-sm flex items-center">
              <h2 className="font-semibold text-lg text-gray-700">
                Chat with {selectedConversation.clientName || selectedConversation._id.slice(-5)}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 flex flex-col">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">
                  No messages yet. Start the conversation!
                </p>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.senderId?.toString() === userId?.toString();
                  return (
                    <div
                      key={msg._id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-md break-words ${
                          isMine
                            ? "bg-orange-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-900 rounded-bl-none"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={`text-[10px] mt-1 ${
                            isMine ? "text-orange-100 text-right" : "text-gray-500 text-left"
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex items-center p-3 border-t bg-white shadow-inner"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="ml-3 px-5 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No conversation selected
          </div>
        )}
      </div>
    </div>
  );
};
