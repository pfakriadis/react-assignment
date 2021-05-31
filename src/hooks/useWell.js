import {useState, useEffect} from "react";

export const useWell = () => {
    const [wells, setWells] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch("http://localhost:8000/wells")
            .then(res => res.json())
            .then(response => {
                setLoading(false);
                setWells(response);
            })
            .catch(err => {
                setWells([]);
                setLoading(false);
                setError(err);
            });

    }, []);

    return {
        wells,
        loading,
        error
    };
};