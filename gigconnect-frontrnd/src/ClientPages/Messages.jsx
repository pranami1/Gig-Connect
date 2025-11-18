import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Messages = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch accepted freelancers
  const fetchAcceptedFreelancers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/applications/client/accepted",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const uniqueFreelancers = res.data.map((app) => ({
        freelancerId: app.freelancer._id,
        name: app.freelancer.name,
        jobTitle: app.job.title,
      }));
      setFreelancers(uniqueFreelancers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Open conversation with freelancer
  const openConversation = async (freelancerId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/conversations",
        { participants: [userId, freelancerId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const conversation = res.data;
      setSelectedConversation(conversation);
      fetchMessages(conversation._id);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch messages
  const fetchMessages = async (conversationId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${conversationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data);
    } catch (err) {
      console.error(err);
      setMessages([]);
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        {
          conversationId: selectedConversation._id,
          senderId: userId,
          text: newMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAcceptedFreelancers();
  }, []);

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-60px)] mt-24 bg-gray-100">
      
      <div className="w-full md:w-1/4 lg:w-1/4 border-r bg-white overflow-y-auto shadow-md">
        <h2 className="p-4 font-bold text-lg border-b bg-gray-100 sticky top-0 z-10">
          Freelancers
        </h2>
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : freelancers.length === 0 ? (
          <p className="p-4 text-gray-500">No accepted freelancers yet</p>
        ) : (
          freelancers.map((f) => {
            const isActive =
              selectedConversation &&
              selectedConversation.participants.includes(f.freelancerId);

            return (
              <div
                key={f.freelancerId}
                onClick={() => openConversation(f.freelancerId)}
                className={`p-4 cursor-pointer border-b hover:bg-gray-50 transition 
                  ${isActive ? "bg-orange-100 border-l-4 border-orange-500 font-semibold" : ""}`}
              >
                <p className="font-semibold text-gray-800">{f.name}</p>
                <p className="text-sm text-gray-500">{f.jobTitle}</p>
              </div>
            );
          })
        )}
      </div>

      {/* Chat Box */}
      <div className="w-full md:w-3/4 lg:w-3/4 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b bg-white shadow-sm">
              <h2 className="font-semibold text-lg text-gray-700">
                Chat with{" "}
                {
                  freelancers.find((f) =>
                    selectedConversation.participants.includes(f.freelancerId)
                  )?.name || selectedConversation._id.slice(-5)
                }
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col bg-gray-50">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">
                  No messages yet. Start the conversation!
                </p>
              ) : (
                messages.map((msg) => {
                  const isOwn = msg.senderId === userId;
                  return (
                    <div
                      key={msg._id}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-md break-words ${
                          isOwn
                            ? "bg-orange-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-900 rounded-bl-none"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={`text-[10px] mt-1 ${
                            isOwn ? "text-orange-100 text-right" : "text-gray-500 text-left"
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
            <div className="flex items-center p-3 border-t bg-white">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 px-5 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a freelancer to chat
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
