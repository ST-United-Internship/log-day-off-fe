const Dashboard = () => {
  const img =
    "https://icdn.dantri.com.vn/thumb_w/680/2023/01/24/khoa-hocdocx-1674520013659.png";
  return (
    <div>
      <div
        className="dashboard-container"
        style={{ width: "1000px", height: "1000px" }}
      >
        <div
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
      </div>
    </div>
  );
};

export default Dashboard;
