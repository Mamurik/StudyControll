import AdminLab from "../../components/AdminPanel/AdminLab/AdminLab";
import AdminSubject from "../../components/AdminPanel/AdminSubject/AdminSubject";
const Admin = () => {
  return (
    <div>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Это страница администрирования
      </h1>
      <AdminLab></AdminLab>
      <AdminSubject></AdminSubject>
    </div>
  );
};

export default Admin;
