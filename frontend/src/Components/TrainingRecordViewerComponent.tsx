import React, { useEffect, useState } from 'react';
import { ShowTraining } from '../types/ShowTraining';

type Props = {
  trainingExtracted: ShowTraining[];
};

export const TrainingRecordViewerComponent: React.FC<Props> = ({trainingExtracted}) => {

  const [showTraining, setShowTraining] = useState<ShowTraining[]>([]);

  useEffect(() => {
    // トレーニングデータを日付の降順にソート
    trainingExtracted.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });

    setShowTraining(trainingExtracted);
  }, [trainingExtracted]);

  return (
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
        {showTraining.map((data, index) => (
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
  );
};
