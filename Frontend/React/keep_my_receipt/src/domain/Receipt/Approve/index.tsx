import React, { useEffect, useState } from "react";
// import Item from "./Item";

export default function Approve({ contents }: { contents: string[] }) {
  const [imageUrl, setImageUrl] = useState("");
  function getImageUrlFromDB() {
    return "";
  }

  useEffect(() => {
    setImageUrl(getImageUrlFromDB());
  }, [setImageUrl]);

  return (
    <div>
      {/* 이미지랑 날짜 총금액 부분 */}
      <img src={imageUrl} alt="" />
      <div>
        <span>날짜</span>
        <span>총금액</span>
      </div>

      {/* 아이템 목록 */}
      {/* {contents.map(content => (
        <Item content={content.name} money={content.money}/>
      ))} */}

      <button>거부</button>
      <button>승인</button>
    </div>
  );
}
