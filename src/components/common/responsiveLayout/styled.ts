import styled from 'styled-components'

interface containerProp{
      maxwidth: number
}

  export const Container = styled.div<containerProp>`
      width: 100%;
      max-width: ${(props)=> props.maxwidth}px;
      margin: 0 auto;
      padding: 0;
`

