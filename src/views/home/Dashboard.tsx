import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Dashboard = () => {
    console.log(useSelector((state: RootState) => state.value));

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;