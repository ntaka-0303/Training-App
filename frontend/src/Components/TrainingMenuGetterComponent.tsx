import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { MenuData } from "../types/MenuData";

type Props = {
  showMenuData: MenuData[];
  setShowMenuData: React.Dispatch<React.SetStateAction<MenuData[]>>;
};


export const TrainingMenuGetterComponent: React.FC<Props> = ({setShowMenuData}) => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const [allParts, setAllParts] = useState<string[]>([]);
  const [targerPart, setTargetPart] = useState<string>('');

  // 初回レンダリング時に実行
  useEffect(() => {
    // 初回表示は全ての部位
    setTargetPart('all');

    // メニュデータを取得
    fetchMenuData();
  }, []);

  // 表示用メニューデータをセット
  useEffect(() => {
    if (targerPart === 'all') {
      setShowMenuData(menuData);
    } else {
      setShowMenuData(menuData.filter(item => item.part === targerPart));
    }
  }, [menuData, targerPart, setShowMenuData]);

  // 全部位をセット
  useEffect(() => {
    const allParts = Array.from(new Set(menuData.map((item) => item.part)));
    setAllParts(allParts);
  }, [menuData]);

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
      </div>
  );
};