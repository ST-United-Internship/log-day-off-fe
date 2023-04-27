const Dashboard = () => {
  const img =
    "https://img3.thuthuatphanmem.vn/uploads/2019/07/07/anh-meo-con-de-thuong_020434420.jpg";
  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
        zIndex: 9999,
      }}
    ></div>
  );
};

export default Dashboard;
