import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { Menu } from "../types/Menu";

type Props = {
  showMenu: Menu[];
  setShowMenu: React.Dispatch<React.SetStateAction<Menu[]>>;
};

export const TrainingMenuGetterComponent: React.FC<Props> = ({setShowMenu}) => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [allParts, setAllParts] = useState<string[]>([]);
  const [targerPart, setTargetPart] = useState<string>('');

  // 初回レンダリング時に実行
  useEffect(() => {
    // 初回表示は全ての部位
    setTargetPart('all');

    // メニュデータを取得
    fetchMenu();
  }, []);

  // 表示用メニューデータをセット
  useEffect(() => {
    if (targerPart === 'all') {
      setShowMenu(menu);
    } else {
      setShowMenu(menu.filter(item => item.part === targerPart));
    }
  }, [menu, targerPart, setShowMenu]);

  // 全部位をセット
  useEffect(() => {
    const allParts = Array.from(new Set(menu.map((item) => item.part)));
    setAllParts(allParts);
  }, [menu]);

  // メニューデータを取得
  const fetchMenu = async () => {
    try {
      const response = await axios.get("/getMenu");
      setMenu(response.data);
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