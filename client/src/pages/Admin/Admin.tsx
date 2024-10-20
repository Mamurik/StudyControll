import React, { useState } from "react";
import CreateSubject from "../../components/Modals/SubjectModals/CreateSubject";
import { ISubject } from "../../API/api";
import CreateLab from "../../components/Modals/LabModals/CreateLab";
import { ILab } from "../../API/api";

const Admin = () => {
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [labs, setLabs] = useState<ILab[]>([]);

  const handleAddSubject = (subject: ISubject) => {
    setSubjects([...subjects, subject]);
    setIsSubjectModalOpen(false);
  };

  const handleAddLab = (lab: ILab) => {
    setLabs([...labs, lab]);
    setIsLabModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsSubjectModalOpen(true)}>
        Добавить Предмет
      </button>
      <button onClick={() => setIsLabModalOpen(true)}>Добавить Лабу</button>
      <button>Удалить Предмет</button>
      <button>Удалить Лабу</button>
      <button>Редактировать Предмет</button>
      <button>Редактировать Лабу</button>

      <CreateSubject
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        onAddSubject={handleAddSubject}
      />
      <CreateLab
        isOpen={isLabModalOpen}
        onClose={() => setIsLabModalOpen(false)}
        onAddLab={handleAddLab}
      />
    </div>
  );
};

export default Admin;
