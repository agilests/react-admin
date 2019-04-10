import userActionKeys from './userActionKeys';

export const login = (user) => {
    return {
        type: userActionKeys.login,
        user: user
    }
};