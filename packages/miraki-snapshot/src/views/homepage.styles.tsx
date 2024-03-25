import styled from 'styled-components'

export const HeaderContainer = styled.div`
   align-items: center;
   display: flex;
   justify-content: center;
   margin-top: 100px;
   margin-bottom: 30px;
`

export const InputContainer = styled.div`
   display: flex;
   justify-content: end;
   margin-bottom: 30px;
`

export const NoDataText = styled.div`
   align-items: center;
   margin-top: 50px;
`

export const NoDataContainer = styled.div`
   justify-content: center;
   display: flex;
`

export const CardContainer = styled.div`
   display: grid;
   gap: 50px;
   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`