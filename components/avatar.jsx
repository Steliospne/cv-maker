"use client";

import style from "./avatar.module.css";
import Image from "next/image";
import CameraLogo from "./logo/cameraLogo";

export default function Avatar({ person, isEditable, onUpload, onClick }) {
  return (
    <div className={style.avatar}>
      {!person.image ? (
        <div>
          <label htmlFor='imageUpload'>
            <CameraLogo className={style.logo} />
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={onUpload}
            style={{ display: "none" }}
            id='imageUpload'
          />
        </div>
      ) : (
        <>
          <Image
            src={person.image}
            width={150}
            height={150}
            alt='Picture of the author'
          />
          {isEditable && (
            <button className={style.deleteBtn} onClick={onClick}>
              ❌
            </button>
          )}
        </>
      )}
    </div>
  );
}
