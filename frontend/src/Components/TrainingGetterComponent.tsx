import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Training } from '../types/Training';
import { ShowTraining } from '../types/ShowTraining';
import { Menu } from '../types/Menu';
import { DaysFunc } from '../util/DaysFunc';

type Props = {
  trainingExtracted: ShowTraining[];
  setTrainingExtracted: React.Dispatch<React.SetStateAction<ShowTraining[]>>;
  isMenuSelected: boolean;
  setIsMenuSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TrainingGetterComponent: React.FC<Props> = ({setTrainingExtracted, setIsMenuSelected}) => {

  const today = DaysFunc.getToday();
  const [training, setTraining] = useState<Training[]>([]);
  const [fromDate, setFromDate] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [targerPart, setTargetPart] = useState<string>('');
  const [targerDiscipline, setTargetDiscipline] = useState<string>('');
  const [menu, setMenu] = useState<Menu[]>([]);
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
    fetchTrainings();

    // メニューデータを取得
    fetchMenu();
  }, []);

  // 表示用トレーニングデータをセット
  useEffect(() => {
    let trainingExtracted : ShowTraining[] = [];
    training.forEach((item) => {
      // メニューデータからメニューを取得
      const targetMenu = menu.find((menu) => menu.id === item.menuId);
      if (targetMenu === undefined) {
        return;
      }

      // 表示用トレーニングデータを生成
      const showTrainingItem : ShowTraining = {
        id: item.id,
        date: item.date,
        part: targetMenu.part,
        discipline: targetMenu.discipline,
        weight: item.weight,
        reps: item.reps,
        sets: item.sets,
        remarks: item.remarks,
      };
      trainingExtracted.push(showTrainingItem);
    });
    
    // Fromから今日までの範囲内のトレーニングを絞り込み
    if (fromDate !== 'all') {
      trainingExtracted = trainingExtracted.filter((item) => 
      DaysFunc.decideDateBetweenFromTo(item.date, fromDate, today));
    }

    // 部位、種目で絞り込み
    if (targerPart !== 'all') {
      trainingExtracted = trainingExtracted.filter((item) => item.part === targerPart);
    }
    if (targerDiscipline !== 'all') {
      trainingExtracted = trainingExtracted.filter((item) => item.discipline === targerDiscipline);
    }

    // メニューの選択状況をセット
    if (targerPart !== 'all' && targerDiscipline !== 'all') {
      setIsMenuSelected(true);
    } else {
      setIsMenuSelected(false);
    }

    setTrainingExtracted(trainingExtracted);
  }, [training, targerPart, targerDiscipline, menu, fromDate, today, setTrainingExtracted, setIsMenuSelected]);

  // From日付をセット
  useEffect(() => {
    // 表示期間からFrom日付をセット
    var fromDate = '';
    if (duration === 'threeDays') {
      fromDate = DaysFunc.getDaysAgo(today, 3);
    } else if (duration === 'oneWeek') {
      fromDate = DaysFunc.getWeeksAgo(today, 1);
    } else if (duration === 'threeWeeks') {
      fromDate = DaysFunc.getWeeksAgo(today, 3);
    } else if (duration === 'oneMonth') {
      fromDate = DaysFunc.getMonthsAgo(today, 1);
    } else if (duration === 'all') {
      fromDate = 'all';
    }
    setFromDate(fromDate);
  }, [duration, today]);

  // 全部位をセット
  useEffect(() => {
    const allParts = Array.from(new Set(menu.map((item) => item.part)));
    setAllParts(allParts);
  }, [menu]);

  // メニューデータまたは部位が変更されたら、選択されている部位に紐づく種目をセット
  useEffect(() => {
    const disciplinesSelectedPart = Array.from(
      new Set(
        menu.filter(item => item.part === targerPart).map(item => item.discipline)
      )
      );
    setDisciplinesSelectedPart(disciplinesSelectedPart);
  }, [menu, targerPart]);

  // トレーニングデータを取得
  const fetchTrainings = async () => {
    try {
      const response = await axios.get('/getTraining');
      setTraining(response.data);
    } catch (error) {
      console.error('Error fetching training datas:', error);
    }
  };

  // メニューデータを取得
  const fetchMenu = async () => {
    try {
      const response = await axios.get("/getMenu");
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  // トレーニングパワーデータを取得

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