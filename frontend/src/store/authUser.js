import axios from 'axios'
import toast from 'react-hot-toast';
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoadingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => { 
        set({isSigningUp:true})
        try {
            const response = await axios.post("/api/v1/auth/signup",credentials);
            set({user:response.data.user, isSigningUp:false});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
            set({isSigningUp:false,user:null});
        }
    },
    login: async (credentials) => {
         set({isLoggingIn:true})
        try {
            const response = await axios.post("/api/v1/auth/login",credentials);
            set({user:response.data.user, isLoggingIn:false});
            toast.success("login successfully");
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
            set({isSigningUp:false,user:null});
        }
    },
    logout: async () => {
        set({isLoadingOut:true});
        try {
            await axios.post("/api/v1/auth/logout");
            set({user:null, isLoadingOut: true});
            toast.success("Logout successfully");
        } catch (error) {
            set({isLoadingOut:false});
            toast.error(error.response.data.message || "logout failed");

        }
    },
    authCheck: async () => {
        set({isCheckingAuth:true});
        try {
            const response = await axios.get("/api/v1/auth/authCheck", { withCredentials: true });
            set({user:response.data.user, isCheckingAuth:false});
        } catch (error) {
            set({user:null, isCheckingAuth:false});
        }
    },
}) );