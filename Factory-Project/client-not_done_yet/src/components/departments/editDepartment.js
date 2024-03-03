import PagesHeader from "../pagesHeader/pagesHeader";

const EditDepartment = () => {
  const userName = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  return <PagesHeader userName={userName} pageName='Edit Department'/>
};

export default EditDepartment;