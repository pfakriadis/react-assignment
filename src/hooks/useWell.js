import {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAction } from '../store/actions/actions';
import * as types from '../store/types';

export const useWell = () => {
    const store = useSelector(setAction);
    const dispatch = useDispatch();
    
    const [wells, setWells] = useState(store.state.payload?.wellsInit ? store.state.payload?.wellsInit : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (wells.length === 0) {
            fetch("http://localhost:8000/wells")
            .then(res => res.json())
            .then(response => {
                setLoading(false);
                setWells(response);
                dispatch({ type: types.ACTIONS, payload: {...store.state.payload, wellsInit: response} });
            })
            .catch(err => {
                setWells([]);
                setLoading(false);
                setError(err);
            });
        }

    }, []);

    return {
        wells,
        loading,
        error
    };
};