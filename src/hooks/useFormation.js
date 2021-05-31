import {useState, useEffect} from "react";

export const useFormation = () => {
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch("http://localhost:8000/formations")
            .then(res => res.json())
            .then(response => {
                setLoading(false);
                setFormations(response);
            })
            .catch(err => {
                setFormations([]);
                setLoading(false);
                setError(err);
            });

    }, []);

    return {
        formations,
        loading,
        error
    };
};