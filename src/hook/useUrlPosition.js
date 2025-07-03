import { useSearchParams } from "react-router";

const useUrlPosition = () => {

    const [searchParams] = useSearchParams();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    return { mapLat, mapLng };

};

export default useUrlPosition;