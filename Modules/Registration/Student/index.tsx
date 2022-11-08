/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const index = () => {
  const router = useRouter();
  const { studio } = router.query;
  const { register, handleSubmit } = useForm();

  return (
    <section>
      <div>
        {typeof studio === "string" &&
          (/studio/gi.test(studio) ? <h1>{studio.toUpperCase()}</h1> : <h1>{`${studio} STUDIO`}</h1>)}
        <div>클래스 신청 - 개인정보</div>
        <div>studio Image</div>
        <div>각 스튜디오에 해당하는 description 가져오기</div>
      </div>
      <form>
        <h2>이름 (입금자명) </h2>
        <input type="text" id="" placeholder="Ex. 김민수(김민수)" {...register("name")} />
        <h2>연락처</h2>
        <input type="text" id="" placeholder="01050946369" {...register("phone")} />
      </form>
      <button>다음 &gt;</button>
    </section>
  );
};

export default index;
