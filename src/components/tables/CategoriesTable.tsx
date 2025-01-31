import { StyledTableCell, StyledTableRow } from "../CustomizedTables";

import { Category } from "@/types";

export const CategoriesTable = (rows:Category[],handleOpenEdit: ()=> void, setCategory:(category:Category)=>void, setCategoryId:(id:string)=>void ,handleOpenDelete: ()=> void)=> {
    return (
        <>
            {
                rows.map((row:Category) => (
                    <StyledTableRow key={row.categoryID}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                        <StyledTableCell >{row.description}</StyledTableCell>
                        <StyledTableCell >{row.slug}</StyledTableCell>
                        <StyledTableCell >{row.createdAt}</StyledTableCell>
                        <StyledTableCell >
                            <button onClick={()=> {handleOpenEdit(); setCategory(row);}}>Edit</button>
                            <button onClick={()=>{handleOpenDelete(); setCategoryId(row.categoryID) }}>Delete</button>
                        </StyledTableCell>
                    </StyledTableRow>
                ))
            }
        </>
    )
}