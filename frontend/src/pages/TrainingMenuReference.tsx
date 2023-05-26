import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { MenuData } from "./types/MenuData";
import { StartButton } from "./Components/movePageButtonComponents";


const TrainingMenuReference: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const [showMenuData, setShowMenuData] = useState<MenuData[]>([]);
  const [allParts, setAllParts] = useState<string[]>([]);
  const [targerPart, setTargetPart] = useState<string>('');

  // 初回レンダリング時に実行
  useEffect(() => {
    // 初回表示は全ての部位
    setTargetPart('all');

    // メニュデータを取得
    fetchMenuData();
  }, []);

  // 全部位をセット
  useEffect(() => {
    const allParts = Array.from(new Set(menuData.map((item) => item.part)));
    setAllParts(allParts);
  }, [menuData]);

  // 表示用メニューデータをセット
  useEffect(() => {
    if (targerPart === 'all') {
      setShowMenuData(menuData);
    } else {
      setShowMenuData(menuData.filter(item => item.part === targerPart));
    }
  }, [menuData, targerPart]);

  // トレーニングAPIのメニュー取得から全てのメニューデータを取得
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
      <h1 className="text-4xl font-bold mb-8">トレーニングメニュー参照</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          className="w-40 h-10 border rounded-lg mt-4" 
          value={targerPart}
          onChange={(event) => setTargetPart(event.target.value)}
        >
          <option value="all">全て</option>
          {allParts.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <StartButton />
      </div>
      <div className="overflow-y-scroll max-h-80">
        <table className="table-fixed w-80 border">
          <thead>
            <tr className="sticky top-0 bg-indigo-500 text-white uppercase text-sm leading-normal">
              <th className="px-4 py-2">部位</th>
              <th className="px-4 py-2">種目</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {showMenuData.map((item, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="px-4 py-2">{item.part}</td>
                <td className="px-4 py-2">{item.discipline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingMenuReference;