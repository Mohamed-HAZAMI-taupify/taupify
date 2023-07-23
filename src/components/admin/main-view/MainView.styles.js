import styled from '@emotion/styled';
export const MainViewContainer = styled.div`
  padding: 100px;
  @media screen and (max-width: 550px){
    padding: 0;
    padding-top : 100px;
  }
  text-align: center;
  overflow: auto;
  max-height: 100vh ;
  h1 {
    font-size: 2rem
  }
`