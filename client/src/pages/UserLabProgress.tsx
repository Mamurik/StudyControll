import React from "react";
import { IUserLabProgress } from "../API/api";

interface IUserProgress {
  userId: number;
  subjectId: number;
  subjectName: string;
  totalLabs: number;
  labProgress: IUserLabProgress[];
}

const UserLabProgress: React.FC = () => {
  const userProgress: IUserProgress[] = [
    {
      userId: 1,
      subjectId: 1,
      subjectName: "Математика",
      totalLabs: 5,
      labProgress: [
        { id: 1, labId: 1, userId: 1, status: 4 },
        { id: 2, labId: 2, userId: 1, status: 5 },
        { id: 3, labId: 3, userId: 1, status: 3 },
        { id: 4, labId: 4, userId: 1, status: 0 },
        { id: 5, labId: 5, userId: 1, status: 2 },
      ],
    },
    {
      userId: 1,
      subjectId: 2,
      subjectName: "Физика",
      totalLabs: 5,
      labProgress: [
        { id: 6, labId: 1, userId: 1, status: 5 },
        { id: 7, labId: 2, userId: 1, status: 3 },
        { id: 8, labId: 3, userId: 1, status: 2 },
        { id: 9, labId: 4, userId: 1, status: 0 },
        { id: 10, labId: 5, userId: 1, status: 1 },
      ],
    },
  ];

  return (
    <div>
      {userProgress.map((progress) => (
        <div key={progress.subjectId}>
          <h2>Прогресс пользователя по предмету: {progress.subjectName}</h2>
          <h3>Всего лабораторных работ: {progress.totalLabs}</h3>
          <table>
            <thead>
              <tr>
                <th>Номер лабораторной работы</th>
                <th>Статус (0-5)</th>
              </tr>
            </thead>
            <tbody>
              {progress.labProgress.map((lab) => (
                <tr key={lab.id}>
                  <td>{lab.labId}</td>
                  <td>{lab.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default UserLabProgress;
