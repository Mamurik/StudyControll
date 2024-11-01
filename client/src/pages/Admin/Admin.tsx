import AdminSubject from "../../components/AdminPanel/AdminSubject/AdminSubject";

const Admin = () => {
  return (
    <div>
      <div>
        <button>Добавить Лабу</button>
        <button>Удалить Лабу</button>
        <button>Редактировать Лабу</button>
      </div>
      <AdminSubject></AdminSubject>
    </div>
  );
};

export default Admin;
