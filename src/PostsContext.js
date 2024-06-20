import React, { createContext, useReducer, useContext } from "react";

/* 
    ContextAPI를 활용해서 동작 : PostsContext.js
    createContext를 사용하여 PostsStateContext, PostsDispatchContext
    1. reducer 생성
    2. 초기값 설정
    3. Context API 생성
    4. Provider 생성
    5. useContext를 사용하여 불러오기
  */

    function reducer(state, action) {
        switch (action.type) {
            case 'SUCCESS':
                return {
                    loading: false,
                    posts: action.posts,
                    error: null,
                }
            case 'LOADING':
                return {
                    loading: true,
                    posts: null,
                    error: null,
                }
            case 'ERROR':
                return {
                    loading: false,
                    posts: null,
                    error: action.error,
                }
            default:
                throw new Error(`Unhandled action type : ${action.type}`)
        }
    }

    const PostsStateContext = createContext({
    state: {loading: false, posts: null, error: null},
    action: {
        setPosts : () => {}
    }
});

    const PostsDispatchContext = createContext(null);

    const PostsProvider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, {
            loading: false,
            posts: null,
            error: null,
        });
        return (
            <PostsStateContext.Provider value={state}>
                <PostsDispatchContext.Provider value={dispatch}>
                    {children}
                </PostsDispatchContext.Provider>
            </PostsStateContext.Provider>
        );
    };

export function usePostsState() {
    const context = useContext(PostsStateContext);
    if (context === undefined) {
        throw new Error('usePostsState must be used within a PostsProvider');
    }
    return context;
}

export function usePostsDispatch() {
    const dispatch = useContext(PostsDispatchContext);
    if (dispatch === undefined) {
        throw new Error('usePostsDispatch must be used within a PostsProvider');
    }
    return dispatch;
}



