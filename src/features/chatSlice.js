import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Current chat data
  currentChat: null,
  messages: [],
  
  // Chat list
  chatList: [],
  
  // Recent plans and saved classes
  recentPlans: [],
  savedClasses: [],
  
  // Message input
  messageInput: '',
  
  // Loading states
  isLoadingMessages: false,
  isLoadingChats: false,
  isSendingMessage: false,
  
  // Error states
  chatError: null,
  messageError: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Current chat actions
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    
    // Messages actions
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action) => {
      const { id, ...updates } = action.payload;
      const messageIndex = state.messages.findIndex(msg => msg.id === id);
      if (messageIndex !== -1) {
        state.messages[messageIndex] = { ...state.messages[messageIndex], ...updates };
      }
    },
    
    // Chat list actions
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
    addChat: (state, action) => {
      state.chatList.unshift(action.payload);
    },
    
    // Plans and classes actions
    setRecentPlans: (state, action) => {
      state.recentPlans = action.payload;
    },
    setSavedClasses: (state, action) => {
      state.savedClasses = action.payload;
    },
    addRecentPlan: (state, action) => {
      state.recentPlans.unshift(action.payload);
      // Keep only last 10 recent plans
      if (state.recentPlans.length > 10) {
        state.recentPlans = state.recentPlans.slice(0, 10);
      }
    },
    addSavedClass: (state, action) => {
      state.savedClasses.push(action.payload);
    },
    removeSavedClass: (state, action) => {
      state.savedClasses = state.savedClasses.filter(
        item => item.id !== action.payload
      );
    },
    
    // Message input actions
    setMessageInput: (state, action) => {
      state.messageInput = action.payload;
    },
    clearMessageInput: (state) => {
      state.messageInput = '';
    },
    
    // Loading actions
    setLoadingMessages: (state, action) => {
      state.isLoadingMessages = action.payload;
    },
    setLoadingChats: (state, action) => {
      state.isLoadingChats = action.payload;
    },
    setSendingMessage: (state, action) => {
      state.isSendingMessage = action.payload;
    },
    
    // Error actions
    setChatError: (state, action) => {
      state.chatError = action.payload;
    },
    setMessageError: (state, action) => {
      state.messageError = action.payload;
    },
    clearChatErrors: (state) => {
      state.chatError = null;
      state.messageError = null;
    },
  },
});

export const {
  setCurrentChat,
  setMessages,
  addMessage,
  updateMessage,
  setChatList,
  addChat,
  setRecentPlans,
  setSavedClasses,
  addRecentPlan,
  addSavedClass,
  removeSavedClass,
  setMessageInput,
  clearMessageInput,
  setLoadingMessages,
  setLoadingChats,
  setSendingMessage,
  setChatError,
  setMessageError,
  clearChatErrors,
} = chatSlice.actions;

export default chatSlice.reducer;