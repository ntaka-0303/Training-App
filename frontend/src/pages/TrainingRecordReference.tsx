import React, { useEffect, useState } from 'react';
import { StartButton } from './Components/movePageButtonComponents';
import axios from '../axiosConfig';
import { TrainingData } from './types/TrainingData';
import { MenuData } from './types/MenuData';
import { DaysFunc } from './util/DaysFunc';

const TrainingDataReference = () => {

  type ShowTrainingData = {
    date: string;
    part: string;
    discipline: string;
    weight: number;
    reps: number;
    sets: number;
    remarks: string;
  };

  const today = DaysFunc.getToday();
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [showTrainingData, setShowTrainingData] = useState<ShowTrainingData[]>([]);
  const [duration, setDuration] = useState<string>('');
  const [targerPart, setTargetPart] = useState<string>('');
  const [targerDiscipline, setTargetDiscipline] = useState<string>('');
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const [allParts, setAllParts] = useState<string[]>([]);
  const [disciplinesSelectedPart, setDisciplinesSelectedPart] = useState<string[]>([]);

  // 初回レンダリング時に実行
  useEffect(() => {
    // 初期表示は１週間前から今日まで
    setDuration('oneWeek');

    // 初期表示は全ての部位、種目
    setTargetPart('all');
    setTargetDiscipline('all');

    // トレーニングデータを取得
    fetchTrainingDatas();

    // メニューデータを取得
    fetchMenuData();
  }, []);

  // 表示用トレーニングデータをセット
  useEffect(() => {
    // 表示期間からFrom日付をセット
    const fromDate = getFromDateByDuration(duration);

    // トレーニングデータから表示用トレーニングデータを生成
    var showTrainingData : ShowTrainingData[] = [];
    trainingData.forEach((item) => {
      // メニューデータからメニューを取得
      const menu  = menuData.find((menu) => menu.id === item.menuId);

      // メニューが存在しない場合はスキップ
      if (menu === undefined) {
        return;
      }

      // 表示用トレーニングデータを生成
      const showTrainingDataItem : ShowTrainingData = {
        date: item.date,
        part: menu.part,
        discipline: menu.discipline,
        weight: item.weight,
        reps: item.reps,
        sets: item.sets,
        remarks: item.remarks,
      };
      showTrainingData.push(showTrainingDataItem);
    });
    
    // Fromから今日までの範囲内のデータを抽出
    showTrainingData = showTrainingData.filter((item) => 
      DaysFunc.decideDateBetweenFromTo(item.date, fromDate, today)
    );

    // 部位、種目で絞り込み
    if (targerPart !== 'all') {
      showTrainingData = showTrainingData.filter((item) => item.part === targerPart);
    }
    if (targerDiscipline !== 'all') {
      showTrainingData = showTrainingData.filter((item) => item.discipline === targerDiscipline);
    }

    // 表示用トレーニングデータを日付の降順にソート
    showTrainingData.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });

    setShowTrainingData(showTrainingData);
  }, [trainingData, duration, targerPart, targerDiscipline]);

  // 表示期間からFrom日付をセット
  function getFromDateByDuration(duration: string) : string {
    if (duration === 'threeDays') {
      return DaysFunc.getDaysAgo(today, 3);
    } else if (duration === 'oneWeek') {
      return DaysFunc.getWeeksAgo(today, 1);
    } else if (duration === 'threeWeeks') {
      return DaysFunc.getWeeksAgo(today, 3);
    } else if (duration === 'oneMonth') {
      return DaysFunc.getMonthsAgo(today, 1);
    }
    return '';
  };

  // 全部位をセット
  useEffect(() => {
    const allParts = Array.from(new Set(menuData.map((item) => item.part)));
    setAllParts(allParts);
  }, [menuData]);


  // メニューデータまたは部位が変更されたら、選択されている部位に紐づく種目をセット
  useEffect(() => {
    const disciplinesSelectedPart = Array.from(
      new Set(
        menuData.filter(item => item.part === targerPart).
        map(item => item.discipline)
      )
      );
    setDisciplinesSelectedPart(disciplinesSelectedPart);
  }, [menuData, targerPart]);

  // トレーニングデータを取得
  const fetchTrainingDatas = async () => {
    try {
      const response = await axios.get('/getTraining');
      setTrainingData(response.data);
    } catch (error) {
      console.error('Error fetching training datas:', error);
    }
  };

  // メニューデータを取得
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
      <h1 className="text-4xl font-bold mb-8">トレーニング記録参照</h1>
      <div className="flex flex-row items-center justify-center mb-4">
        <select
          className="w-40 h-10 border rounded-lg mr-4"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="threeDays">3日間</option>
          <option value="oneWeek">1週間</option>
          <option value="threeWeeks">3週間</option>
          <option value="oneMonth">1ヶ月</option>
        </select>
        <select
          className="w-40 h-10 border rounded-lg mr-4"
          value={targerPart}
          onChange={(e) => setTargetPart(e.target.value)}
        >
          <option value="all">全ての部位</option>
          {allParts.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select
          className="w-40 h-10 border rounded-lg mr-4"
          value={targerDiscipline}
          onChange={(e) => setTargetDiscipline(e.target.value)}
        >
          <option value="all">全ての種目</option>
          {disciplinesSelectedPart.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="overflow-y-scroll max-h-80">
        <table className="table-fixed w-100 bg-white border">
          <thead>
            <tr className="sticky top-0 bg-indigo-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">日付</th>
              <th className="py-3 px-6 text-left">部位</th>
              <th className="py-3 px-6 text-left">種目</th>
              <th className="py-3 px-6 text-left">セット数</th>
              <th className="py-3 px-6 text-left">重量</th>
              <th className="py-3 px-6 text-left">レップ数</th>
              <th className="py-3 px-6 text-left">備考</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {showTrainingData.map((data, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="py-3 px-6">{data.date}</td>
                <td className="py-3 px-6">{data.part}</td>
                <td className="py-3 px-6">{data.discipline}</td>
                <td className="py-3 px-6">{data.sets}</td>
                <td className="py-3 px-6">{data.weight}</td>
                <td className="py-3 px-6">{data.reps}</td>
                <td className="py-3 px-6">{data.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StartButton/>
    </div>
  );
};

export default TrainingDataReference;
