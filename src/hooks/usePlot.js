import {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAction } from '../store/actions/actions';
import * as types from '../store/types';

export const usePlot = () => {
    const store = useSelector(setAction);
    const dispatch = useDispatch();

    const [plots, setPlots] = useState(store.state.payload?.plotsInit ? store.state.payload?.plotsInit : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (plots.length === 0) {
            fetch("http://localhost:8000/plots")
                .then(res => res.json())
                .then(response => {
                    setLoading(false);
                    setPlots(response);
                    dispatch({ type: types.ACTIONS, payload: {...store.state.payload, plotsInit: response} });
                })
                .catch(err => {
                    setPlots([]);
                    setLoading(false);
                    setError(err);
                });
        }
    }, []);

    return {
        plots,
        loading,
        error
    };
};