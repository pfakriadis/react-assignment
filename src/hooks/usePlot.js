import {useState, useEffect} from "react";

export const usePlot = () => {
    const [plots, setPlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch("http://localhost:8000/plots")
            .then(res => res.json())
            .then(response => {
                setLoading(false);
                setPlots(response);
            })
            .catch(err => {
                setPlots([]);
                setLoading(false);
                setError(err);
            });

    }, []);

    return {
        plots,
        loading,
        error
    };
};