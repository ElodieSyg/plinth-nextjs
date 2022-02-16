// DEPENDENCIES IMPORTATIONS
import styled from "styled-components";

const FilterContainer = styled.div`
    margin: 2rem 1rem 1rem 1rem;
    height: 3rem;
    display: flex;
    justify-content: space-evenly;
    align-items; center;
`;

const Input = styled.input`
    width: 15rem;
    height: 2rem;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    text-align: center;
`;

const FilterBar = (props) => {
    return (
        <FilterContainer>
            <Input 
                placeholder={props.placeholder}
                value={props.filter}
                onChange={props.onChange}
                />
         </FilterContainer>
    );
};

export default FilterBar;