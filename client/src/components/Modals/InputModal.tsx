import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  text-align: center;
  margin: 120px auto;
`;

export const ModalView = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 310px;
  height: 10rem;
  > .desc {
    display: flex;
    flex-direction: column;
    margin: 1rem 0rem;
    > .close-btn {
      color: black;
      cursor: pointer;
      text-align: right;
      margin: 0rem 1rem;
      font-size: large;
    }
    > .quit-info {
      font-size: medium;
      margin: 0.5rem 0rem;
    }
    > .choice {
      > button {
        font-size: small;
        cursor: pointer;
        background-color: white;
        border: none;
        border: solid 2px black;
        padding: 0.3rem 1rem;
        border-radius: 20px;
        margin: 0.5rem;
        width: 4.5rem;
      }
      > button:hover {
        background-color: black;
        color: white;
      }
    }
  }
`;

interface DeleteModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  // handlePostDelete: () => void;
  infoModal: string;
}

const InputModal: React.FC<DeleteModalProps> = ({ setIsModal, infoModal }) => {
  let dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
    setIsModal((cur) => !cur);
  };

  let user = useSelector((state: RootState) => state.userInfo.userInfo);
  const localUser = localStorage.getItem("userInfo");
  if (localUser !== null) {
    user = JSON.parse(localUser);
  }

  const handlDelete = () => {
    // handlePostDelete();
  };

  return (
    <ModalContainer>
      {isOpen === true ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <div className="desc">
              <span onClick={openModalHandler} className="close-btn">
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
              <div className="quit-info">{infoModal}하시겠습니까?</div>
              <div className="choice">
                <button onClick={handlDelete}>예</button>
                <button onClick={openModalHandler}>아니오</button>
              </div>
            </div>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
};
export default InputModal;
