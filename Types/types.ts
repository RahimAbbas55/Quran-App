// NAVIGATOR TYPES
export type AuthStackParamList = {
    Splash: undefined;
    Login: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
}

export type MainStackParamList = {
    Homepage: undefined;
    LearningPath: undefined;
    Memorization: undefined;
    QuranReading: undefined;
    Settings: undefined;
    Tafsir: undefined;
    AIBot: undefined;
}

// USER TYPE
export type userType = {
    uid?: string;
    email?: string | null;
    name: string | null;
} | null;

// CONTEXT API TYPES
export type AuthContextType = {
    user: userType;
    setUser: Function;
    login: (
        email : string, password :string
    ) => Promise<{ success: boolean; msg?: string}>;
    register: (
        email: string, 
        password: string,
        name: string
    ) => Promise<{ success: boolean; msg?: string }>;
    updateUserData: ( userId: string ) => Promise<void>
}