import { useState } from "react";
import { useSelector } from "react-redux";
// import { logout } from '../store/slices/authSlice';
import {
  User,
  LogOut,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Settings,
  Bell,
  Calendar,
} from "lucide-react";
import ChatInterface from "../components/dashboard/chat/Chat";
import ProfileModal from "../components/dashboard/profile/Profile";
import FAQSection from "../components/dashboard/faq/Faq";
import CalendarView from "../components/dashboard/calender/Calender";
import Button from "../components/ui/Button";
import TermsModal from "../components/modals/Terms";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // const [logoutMutation] = useLogoutMutation();

  const [activeView, setActiveView] = useState("chat");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // const handleLogout = async () => {
  //   try {
  //     await logoutMutation().unwrap();
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   } finally {
  //     dispatch(logout());
  //   }
  // };

  const renderActiveView = () => {
    switch (activeView) {
      case "chat":
        return <ChatInterface />;
      case "calendar":
        return <CalendarView />;
      default:
        return <ChatInterface />;
    }
  };

  if (activeView === "chat" || activeView === "calendar") {
    return (
      <div className="bg-gray-50">
        {/* Top Navigation */}
        <div className="fixed top-0 w-full px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img src="/src/assets/Gameplan. 2-01-01 1.png" alt="" />
              </div>

              <nav className="flex items-center gap-1">
                <button
                  onClick={() => setActiveView("chat")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === "chat"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <MessageCircle size={16} className="inline mr-2" />
                  Chat
                </button>
                <button
                  onClick={() => setActiveView("calendar")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === "calendar"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Calendar size={16} className="inline mr-2" />
                  Calendar
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* <button
                onClick={() => setShowFAQ(true)}
                className="p-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100"
              >
                <HelpCircle size={20} />
              </button>

              <button className="p-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100">
                <Bell size={20} />
              </button> */}

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      Dr. {user?.userName}
                    </p>
                    <p className="text-xs text-gray-500">Medicine specialist</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowUserMenu(false);
                      }}
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <User size={16} />
                      Profile
                    </button>
                    <button
                      onClick={() => setShowFAQ(true)}
                      variant="outline"
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <HelpCircle size={16} />
                      FAQ
                    </button>
                    <button
                      onClick={() => setShowTerms(true)}
                      variant="outline"
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      Trams & Condition
                    </button>
                    <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                      <Settings size={16} />
                      Settings
                    </button>
                    <hr className="my-2" />
                    <button
                      // onClick={handleLogout}
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {renderActiveView()}

        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
        />

        <FAQSection isOpen={showFAQ} onClose={() => setShowFAQ(false)} />
        <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              GamePlan Dashboard
            </h1>
            <p className="mt-1 text-gray-600">
              Welcome back, Dr. {user?.userName}!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowFAQ(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <HelpCircle size={16} />
              FAQ
            </Button>
            <Button
              onClick={() => setShowProfileModal(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <User size={16} />
              Profile
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            onClick={() => setActiveView("chat")}
            className="p-8 transition-all duration-300 transform bg-white shadow-xl cursor-pointer rounded-2xl hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Chat Interface</h3>
                <p className="text-sm text-gray-600">
                  AI-powered sports assistant
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Get real-time updates on your favorite teams, player statistics,
              and match analysis through our intelligent chat system.
            </p>
          </div>

          <div
            onClick={() => setActiveView("calendar")}
            className="p-8 transition-all duration-300 transform bg-white shadow-xl cursor-pointer rounded-2xl hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Calendar & Planning
                </h3>
                <p className="text-sm text-gray-600">Schedule and organize</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Plan your training sessions, manage team schedules, and keep track
              of important matches and events.
            </p>
          </div>

          <div className="p-8 bg-white shadow-xl rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Profile Management
                </h3>
                <p className="text-sm text-gray-600">Your account details</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">Dr. {user?.userName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Subscription</p>
                <span className="inline-flex px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                  Standard Account
                </span>
              </div>
            </div>
          </div>
        </div>

        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
        />

        <FAQSection isOpen={showFAQ} onClose={() => setShowFAQ(false)} />

        <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      </div>
    </div>
  );
};

export default DashboardLayout;
