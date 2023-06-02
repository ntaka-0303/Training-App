import React from "react";
import { Menu } from "../types/Menu";

type Props = {
  showMenu: Menu[];
};

export const TrainingMenuViewerComponent: React.FC<Props> = ({showMenu}) => {

  return (
      <div className="overflow-y-scroll max-h-80">
        <table className="table-fixed w-80 border">
          <thead>
            <tr className="sticky top-0 bg-indigo-500 text-white uppercase text-sm leading-normal">
              <th className="px-4 py-2">部位</th>
              <th className="px-4 py-2">種目</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {showMenu.map((item, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="px-4 py-2">{item.part}</td>
                <td className="px-4 py-2">{item.discipline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};