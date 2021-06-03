import {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAction } from '../store/actions/actions';
import * as types from '../store/types';

export const useFormation = () => {
    const store = useSelector(setAction);
    const dispatch = useDispatch();

    const [formations, setFormations] = useState(store.state.payload?.formationsInit ? store.state.payload?.formationsInit : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (formations.length === 0) {
            fetch("http://localhost:8000/formations")
                .then(res => res.json())
                .then(response => {
                    setLoading(false);
                    setFormations(response);
                    dispatch({ type: types.ACTIONS, payload: {...store.state.payload, formationsInit: response} });
                })
                .catch(err => {
                    setFormations([]);
                    setLoading(false);
                    setError(err);
                });
        }
    }, []);

    return {
        formations,
        loading,
        error
    };
};