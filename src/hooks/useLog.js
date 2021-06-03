import {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAction } from '../store/actions/actions';
import * as types from '../store/types';

export const useLog = () => {
    const store = useSelector(setAction);
    const dispatch = useDispatch();

    const [logs, setLogs] = useState(store.state.payload?.logsInit ? store.state.payload?.logsInit : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (logs.length === 0) {
            fetch("http://localhost:8000/logs")
                .then(res => res.json())
                .then(response => {
                    setLoading(false);
                    setLogs(response);
                    dispatch({ type: types.ACTIONS, payload: {...store.state.payload, logsInit: response} });
                })
                .catch(err => {
                    setLogs([]);
                    setLoading(false);
                    setError(err);
                });
        }
    }, []);

    return {
        logs,
        loading,
        error
    };
};