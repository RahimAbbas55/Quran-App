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
export type UserType = {
    uid?: string;
    email?: string | null;
    name: string | null;
} | null;
