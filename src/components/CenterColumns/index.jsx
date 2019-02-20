import styled from 'styled-components';
import Columns from 'react-bulma-components/lib/components/columns';

export default styled(Columns)`
    height:  ${props => props.height || '100%'};
    align-items: center;
`;
