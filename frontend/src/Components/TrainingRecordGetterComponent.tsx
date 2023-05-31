import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { TrainingData } from '../types/TrainingData';
import { ShowTrainingData } from '../types/ShowTrainingData';
import { MenuData } from '../types/MenuData';
import { DaysFunc } from '../util/DaysFunc';

type Props = {
  showTrainingData: ShowTrainingData[];
  setShowTrainingData: React.Dispatch<React.SetStateAction<ShowTrainingData[]>>;
};

export const TrainingRecordGetterComponent: React.FC<Props> = ({setShowTrainingData}) => {

  const today = DaysFunc.getToday();
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [fromDate, setFromDate] = useState<string>('');
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
  }, [trainingData, targerPart, targerDiscipline, menuData, fromDate, today, setShowTrainingData]);

  // From日付をセット
  useEffect(() => {
    // 表示期間からFrom日付をセット
    var fromDate = '';
    if (duration === 'threeDays') {
      fromDate = DaysFunc.getDaysAgo(today, 3);
    } else if (duration === 'oneWeek') {
      fromDate =  DaysFunc.getWeeksAgo(today, 1);
    } else if (duration === 'threeWeeks') {
      fromDate =  DaysFunc.getWeeksAgo(today, 3);
    } else if (duration === 'oneMonth') {
      fromDate =  DaysFunc.getMonthsAgo(today, 1);
    }
    setFromDate(fromDate);
  }, [duration, today]);

  // 全部位をセット
  useEffect(() => {
    const allParts = Array.from(new Set(menuData.map((item) => item.part)));
    setAllParts(allParts);
  }, [menuData]);

  // メニューデータまたは部位が変更されたら、選択されている部位に紐づく種目をセット
  useEffect(() => {
    const disciplinesSelectedPart = Array.from(
      new Set(
        menuData.filter(item => item.part === targerPart).map(item => item.discipline)
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
          <option value="all">全て</option>
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
  );
};
