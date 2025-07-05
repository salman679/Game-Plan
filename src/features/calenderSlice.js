import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Calendar data
  events: [],
  currentDate: new Date().toISOString(),
  selectedDate: null,
  viewMode: 'month', // month, week, day
  
  // Event management
  selectedEvent: null,
  showEventModal: false,
  
  // Plans and classes
  plans: [],
  classes: [],
  
  // Loading states
  isLoadingEvents: false,
  isLoadingPlans: false,
  isCreatingEvent: false,
  
  // Error states
  eventsError: null,
  plansError: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // Calendar navigation
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    navigateMonth: (state, action) => {
      const currentDate = new Date(state.currentDate);
      currentDate.setMonth(currentDate.getMonth() + action.payload);
      state.currentDate = currentDate.toISOString();
    },
    
    // Events management
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const { id, ...updates } = action.payload;
      const eventIndex = state.events.findIndex(event => event.id === id);
      if (eventIndex !== -1) {
        state.events[eventIndex] = { ...state.events[eventIndex], ...updates };
      }
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    
    // Event modal
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    setShowEventModal: (state, action) => {
      state.showEventModal = action.payload;
    },
    
    // Plans and classes
    setPlans: (state, action) => {
      state.plans = action.payload;
    },
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    addPlan: (state, action) => {
      state.plans.push(action.payload);
    },
    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
    removePlan: (state, action) => {
      state.plans = state.plans.filter(plan => plan.id !== action.payload);
    },
    removeClass: (state, action) => {
      state.classes = state.classes.filter(cls => cls.id !== action.payload);
    },
    
    // Loading actions
    setLoadingEvents: (state, action) => {
      state.isLoadingEvents = action.payload;
    },
    setLoadingPlans: (state, action) => {
      state.isLoadingPlans = action.payload;
    },
    setCreatingEvent: (state, action) => {
      state.isCreatingEvent = action.payload;
    },
    
    // Error actions
    setEventsError: (state, action) => {
      state.eventsError = action.payload;
    },
    setPlansError: (state, action) => {
      state.plansError = action.payload;
    },
    clearCalendarErrors: (state) => {
      state.eventsError = null;
      state.plansError = null;
    },
  },
});

export const {
  setCurrentDate,
  setSelectedDate,
  setViewMode,
  navigateMonth,
  setEvents,
  addEvent,
  updateEvent,
  removeEvent,
  setSelectedEvent,
  setShowEventModal,
  setPlans,
  setClasses,
  addPlan,
  addClass,
  removePlan,
  removeClass,
  setLoadingEvents,
  setLoadingPlans,
  setCreatingEvent,
  setEventsError,
  setPlansError,
  clearCalendarErrors,
} = calendarSlice.actions;

export default calendarSlice.reducer;