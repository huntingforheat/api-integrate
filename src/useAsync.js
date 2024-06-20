import React, { useEffect, useReducer } from "react";

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

function useAsync(callback, deps = []) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        posts: null,
        error: null
    });

    const fetchData = async() => {
        dispatch({type: 'LOADING'});
        try{
            const response = await callback();
            dispatch({type: 'SUCCESS', posts: response.filter(t => t.id <= 20)});
        } catch(e) {
            dispatch({type: 'ERROR', error: e.message})
        }
    };

    useEffect(() => {
        fetchData();
    }, deps);

    return [state, fetchData];
}
