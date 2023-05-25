import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
interface MenuData {
  part: string;
  discipline: string;
};

const TrainingMenuReference: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuData();
  }, []);

  // Fetch the menu data from the API
  const fetchMenuData = async () => {
    try {
      const response = await axios.get("/getMenu");
      setMenuData(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const handleReturnToMenu = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Menu Reference</h1>
      <table className="min-w-max bg-white border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-500 text-white rounded uppercase text-sm leading-normal">
            <th className="px-4 py-2 text-white bg-blue-500">Site</th>
            <th className="px-4 py-2 text-white bg-blue-500">Species</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {menuData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-2">{item.part}</td>
              <td className="px-4 py-2">{item.discipline}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleReturnToMenu} className="px-4 py-2 mt-4 bg-gray-300 hover:bg-gray-400 rounded">
        Return to Menu
      </button>
    </div>
  );
};

export default TrainingMenuReference;
