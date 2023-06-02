import React, { useState, useEffect } from 'react';
import { ShowTraining } from '../types/ShowTraining';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
    trainingExtracted: ShowTraining[];
    isMenuSelected: boolean;
};

export const TrainingGraphViewerComponent: React.FC<Props> = ({trainingExtracted, isMenuSelected}) => {

    const [showTraining, setShowTraining] = useState<ShowTraining[]>([]);
    const [targetItem, setTargetItem] = useState('sets');
    const [graph, setGraph] = useState<any>({});
    const [options, setOptions] = useState<any>({});

    // ラベルとデータをセット
    useEffect(() => {
        // トレーニングデータを日付の昇順にソート
        trainingExtracted.sort((a, b) => {
          if (a.date > b.date) return 1;
          if (a.date < b.date) return -1;
          return 0;
        });

        // メニューの選択状態によって表示するデータを変更
        if (isMenuSelected) {
            setShowTraining(trainingExtracted);
        } else {
            setShowTraining([]);
        };
    }, [trainingExtracted, isMenuSelected]);

    useEffect(() => {
        // グラフに表示するデータを設定
        const date: string[] = [];
        const sets: number[] = [];
        const weight: number[] = [];
        const reps: number[] = [];
        showTraining.forEach((item) => {
            date.push(item.date);
            sets.push(item.sets);
            weight.push(item.weight);
            reps.push(item.reps);
        });
        
        // グラフを作成
        if (targetItem === 'sets') {
            // セット数のグラフを作成
            createGraph(date, sets, weight, 'セット数');

        } else if (targetItem === 'reps') {
            // レップ数のグラフを作成
            createGraph(date, reps, weight, 'レップ数');
        };
    }, [showTraining,targetItem, options]);

    // 左側のグラフの作成
    const createGraph = (labels: string[], data: number[], weight:number[], label:string) => {
        setOptions({
            stacked: false,
            scales: {
                y1: {
                    type: 'linear' as const,
                    display: true,
                    position: 'left' as const,
                    min: 0,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                    },
                },
                y2: {
                    type: 'linear' as const,
                    display: true,
                    position: 'right' as const,
                    grid: {
                        drawOnChartArea: false,
                    },
                }, 
            },
        });
        setGraph({
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'y1',
                },
                {
                    label: '重量',
                    data: weight,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                    yAxisID: 'y2',
                },
            ]
        });
    };

    return (
        <div className="flex flex-col items-center justify-center mb-4">
            {<select
            className="h-10 text-center border rounded-lg mr-4"
            value={targetItem}
            onChange={(e) => setTargetItem(e.target.value)}
            >
                <option value="sets">セット数＆重量</option>
                <option value="reps">レップ数＆重量</option>
            </select>}
            { isMenuSelected ? (
                <Line options={options} data={graph} width={600} height={400}/> 
            ) : null}
        </div>
    );
};