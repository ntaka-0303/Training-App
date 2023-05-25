import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { MenuData } from "./types/MenuData";
import { StartButton } from "./Components/movePageButtonComponents";


const TrainingMenuReference: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);

  useEffect(() => {
    fetchMenuData();
  }, []);

  // トレーニングAPIのメニュー取得からメニューデータを取得
  const fetchMenuData = async () => {
    try {
      const response = await axios.get("/getMenu");
      setMenuData(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">メニュー参照</h1>
      <table className="min-w-max bg-white border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-500 text-white rounded uppercase text-sm leading-normal">
            <th className="px-4 py-2 text-white bg-blue-500">部位</th>
            <th className="px-4 py-2 text-white bg-blue-500">種目</th>
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
      <StartButton />
    </div>
  );
};

export default TrainingMenuReference;