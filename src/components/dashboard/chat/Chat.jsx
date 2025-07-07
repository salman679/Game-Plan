import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Send, User, Bot, Calendar, Plus, MoreHorizontal } from "lucide-react";
import {
  // useAddMessageToChatMutation,
  useCreateChatMutation,
  useGetUserChatListQuery,
} from "../../../app/authApi";
import {
  addMessage,
  addRecentPlan,
  clearMessageInput,
  setChatError,
  setChatList,
  setMessageInput,
  setMessages,
  setSendingMessage,
} from "../../../features/chatSlice";
import { addNotification } from "../../../features/uiSlice";
import Button from "../../ui/Button";

const ChatInterface = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const {
    messages,
    messageInput,
    isSendingMessage,
    recentPlans,
    savedClasses,
  } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const messagesEndRef = useRef(null);
  const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation();
  // const [addMessageToChat] = useAddMessageToChatMutation();
  const { data: chatListData, isLoading: isLoadingChats } =
    useGetUserChatListQuery();

  // Initialize with some default data if no API data
  const [localRecentPlans] = useState([
    { id: 1, name: "Last chat", status: "recent" },
    { id: 2, name: "Last chat", status: "recent" },
    { id: 3, name: "Last chat", status: "recent" },
  ]);

  const [localSavedClasses] = useState([
    { id: 1, name: "Last chat", status: "saved" },
    { id: 2, name: "Last chat", status: "saved" },
    { id: 3, name: "Last chat", status: "saved" },
  ]);

  useEffect(() => {
    if (chatListData) {
      dispatch(setChatList(chatListData.chats || []));
    }
  }, [chatListData, dispatch]);

  useEffect(() => {
    // Initialize with some sample messages if none exist
    if (messages.length === 0) {
      dispatch(
        setMessages([
          {
            id: 1,
            text: "What Are The Latest Updates On My Favorite Team?",
            sender: "user",
            timestamp: new Date(),
          },
          {
            id: 2,
            text: "Your Favorite Team, Real Madrid, Won 2-0 Today. Vinicius Junior Scored Both Goals!",
            sender: "bot",
            timestamp: new Date(),
          },
        ])
      );
    }
  }, [messages.length, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: "user",
      timestamp: new Date(),
    };

    dispatch(addMessage(newMessage));
    dispatch(setSendingMessage(true));

    const currentMessage = messageInput;
    dispatch(clearMessageInput());

    try {
      // Use createChat for the first message or addMessageToChat for subsequent messages
      const response = await createChat({
        chat: currentMessage,
        sender: "user",
      }).unwrap();

      // Add to recent plans
      dispatch(
        addRecentPlan({
          id: Date.now(),
          name:
            currentMessage.substring(0, 30) +
            (currentMessage.length > 30 ? "..." : ""),
          status: "recent",
        })
      );

      // Add bot response from API
      if (response.botResponse) {
        const botResponse = {
          id: Date.now() + 1,
          text: response.botResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        dispatch(addMessage(botResponse));
      } else {
        // Fallback response if API doesn't return a response
        const fallbackResponse = {
          id: Date.now() + 1,
          text: "I'm here to help you with sports updates and team information. What would you like to know?",
          sender: "bot",
          timestamp: new Date(),
        };
        dispatch(addMessage(fallbackResponse));
      }

      dispatch(
        addNotification({
          type: "success",
          message: "Message sent successfully!",
        })
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      dispatch(setChatError(error.message || "Failed to send message"));

      // Add error response
      const errorResponse = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      dispatch(addMessage(errorResponse));

      dispatch(
        addNotification({
          type: "error",
          message: error.message || "Failed to send message",
        })
      );
    } finally {
      dispatch(setSendingMessage(false));
    }
  };

  const handleInputChange = (e) => {
    dispatch(setMessageInput(e.target.value));
  };

  const displayRecentPlans =
    recentPlans.length > 0 ? recentPlans : localRecentPlans;
  const displaySavedClasses =
    savedClasses.length > 0 ? savedClasses : localSavedClasses;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed bottom-0 left-0 flex flex-col h-full bg-white border-r border-gray-200 w-80 top-24">
        <div className="p-6 border-b border-gray-200">
          <Button className="flex items-center w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus size={16} />
            New Plans
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Calendar
              </span>
            </div>

            <button className="w-full p-3 mb-4 text-left transition-colors rounded-lg hover:bg-gray-50">
              <span className="text-sm text-gray-600">Create Class</span>
            </button>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Recent plans
                </span>
                <span className="text-xs text-gray-500">All filters</span>
              </div>
              {isLoadingChats ? (
                <div className="flex justify-center py-4">
                  <div className="w-4 h-4 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-1">
                  {displayRecentPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                    >
                      <span className="text-sm text-gray-600">{plan.name}</span>
                      <MoreHorizontal size={14} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Save Class
                </span>
                <span className="text-xs text-gray-500">All filters</span>
              </div>
              <div className="space-y-1">
                {displaySavedClasses.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                  >
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <MoreHorizontal size={14} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full text-indigo-600 border-indigo-600 hover:bg-indigo-50"
          >
            Upgrade To Pro
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">
                Dr. {user?.userName}
              </h2>
              <p className="text-sm text-gray-500">Medicine specialist</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Save
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6space-y-6 ml-[330px] mr-5 mt-16 mb-32 no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full">
                  <Bot size={16} className="text-gray-600" />
                </div>
              )}
              <div
                className={`max-w-md ${msg.sender === "user" ? "order-1" : ""}`}
              >
                <div
                  className={`p-4 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
              {msg.sender === "user" && (
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {isSendingMessage && (
            <div className="flex justify-start gap-3">
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full">
                <Bot size={16} className="text-gray-600" />
              </div>
              <div className="max-w-md">
                <div className="p-4 bg-white border border-gray-200 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 fixed bottom-0 left-[320px] right-0 bg-white border-t border-gray-200 ">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={messageInput}
                onChange={handleInputChange}
                placeholder="Type Your Text"
                disabled={isSendingMessage || isCreatingChat}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={
                  !messageInput.trim() || isSendingMessage || isCreatingChat
                }
                className="absolute flex items-center justify-center w-8 h-8 text-white transition-colors transform -translate-y-1/2 bg-indigo-600 rounded-full right-2 top-1/2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingMessage || isCreatingChat ? (
                  <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </form>

          {/* Suggested Questions */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() =>
                dispatch(setMessageInput("What should I type in text box?"))
              }
              className="px-3 py-1 text-xs text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
            >
              What should I type in text box?
            </button>
            <button
              onClick={() =>
                dispatch(
                  setMessageInput(
                    "What are the latest updates on my favorite team?"
                  )
                )
              }
              className="px-3 py-1 text-xs text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
            >
              Latest team updates
            </button>
            <button
              onClick={() =>
                dispatch(setMessageInput("Show me player statistics"))
              }
              className="px-3 py-1 text-xs text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
            >
              Player statistics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
