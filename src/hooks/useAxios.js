import { useState } from "react";

export const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async (apiMethod, ...params) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiMethod(...params);
            setData(response);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Something went wrong");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, fetchData };
};
