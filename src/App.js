import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import PhotoComponent from "./components/PhotoComponent";

function App() {
  const SetCookie = () => {
    return {
      Secure: true,
      SameSite: "None",
    };
  };

  const apiKey = `mvTXj71OpORDBjudphzxMa9JaH7G5CNUgux7BBVhkVY`;
  const [Photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); //ป้องกันไม่ให้ เวลา state page เปลี่ยน แล้วpageเปลี่ยนเยอะๆ
  const fetchImage = async () => {
    // console.log("foo");
    setIsLoading(true); //ตรงนี้คือการบอกว่า ข้อมูลทำการโหลดอยู่
    try {
      const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`; //&per_page=15
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhotos((oldData) => {
        SetCookie();

        return [...oldData, ...data];
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false); //ข้อมูลโหลดเสร็จแล้ว กลับเป็น false
  };
  useEffect(() => {
    //ต้องเรียกใช้ฟังค์ชั่นใน useEffect ไม่งั้นreact จะขึ้นแจ้งเตือน
    fetchImage();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    //ใช้ดักจับevent เมื่อมีการscroll
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >
          document.body.offsetHeight - 500 &&
        !isLoading
      )
        //ต้องการให้เลื่อนมาจนถึงล่างสุดของweb แล้วเกิดบางสิ่ง (หรือแก้เป็น เกือบสุด คือใส่ -500 เข้าไป)
        setPage((oldPage) => {
          return oldPage + 1;
        });
    });
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);
  return (
    <main>
      <Header />
      <section className="photos">
        <div className="display-photos">
          {Photos.map((data, index) => {
            return <PhotoComponent key={index} {...data} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
