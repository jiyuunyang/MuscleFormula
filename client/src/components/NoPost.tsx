import styled from "styled-components"
import { useNavigate } from "react-router-dom";

export const NoContentContainer=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 4.5rem;
  padding-bottom: 1.5rem;
  > img {
    width: 70px;
    margin-bottom: 1rem;
  }
  > div {
    text-align: center;
    > strong {
      cursor: pointer;
    }
  }
`

export default function NoPost() {
  const navigate = useNavigate();
  return (
    <NoContentContainer>
      <img src="../images/icon_yoga.png" alt="no_content"/>
      <div>포스팅이 없습니다<br></br>운동을 <strong onClick={()=>navigate("/record")}>기록하고 공유</strong>해보세요</div>
    </NoContentContainer>
  )
}