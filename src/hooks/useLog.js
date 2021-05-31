import {useState, useEffect} from "react";

export const useLog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch("http://localhost:8000/logs")
            .then(res => res.json())
            .then(response => {
                setLoading(false);
                setLogs(response);
            })
            .catch(err => {
                setLogs([]);
                setLoading(false);
                setError(err);
            });

    }, []);

    return {
        logs,
        loading,
        error
    };
};